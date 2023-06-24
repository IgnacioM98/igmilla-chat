import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../config/firebase";
import { cleanString } from "../../../utils/utils";

import {
  FirebaseFirestoreTypes,
  firebase,
} from "@react-native-firebase/firestore";
import { Conversation } from "../../../models/conversation";
import { loadingState } from "../../../models/load-states";
import { Session } from "../../../models/session";
import { UserDb } from "../../../models/usuario";
import { RootState } from "../../store/store";
import {
  setActiveConversation,
  setActiveSession,
  setAddSessions,
  setAddUsers,
  setChats,
  setSessions,
  setSessionsState,
  setUsers,
  setUsersState,
} from "./chatSlice";

const SESSIONS = db.collection("Sesiones");
const USERS = db.collection("Usuarios");

let subscribedChat: any;

export const getAvailableUsers = createAsyncThunk(
  "chat/get-available-users",
  async (searchText: string | undefined, { dispatch, getState }) => {
    try {
      const { user } = (getState() as RootState).auth;
      if (!user) return;
      dispatch(setUsersLoading("submit"));
      let query = USERS.orderBy("_nombre");
      if (searchText) {
        query = query
          .startAt(cleanString(searchText))
          .endAt(cleanString(searchText) + "\uf8ff");
      }
      const res = await query.get();
      const data: any[] = res.docs
        .filter((doc) => doc.id !== user.id)
        .map((doc) => ({ id: doc.id, _ref: doc.ref, ...doc.data() }));
      // Success
      dispatch(setUsersData(data));
    } catch (err: any) {
      console.log(err);
      // Failure
      dispatch(setUsersLoading("error"));
    }
  }
);

export const getAvailableSessions = createAsyncThunk(
  "chat/get-available-sessions",
  async (_, { dispatch, getState }) => {
    try {
      const { user } = (getState() as RootState).auth;
      if (!user) return;
      dispatch(setSessionsLoading("submit"));

      const res = await SESSIONS.where(
        "participantes",
        "array-contains",
        user
      ).get();

      const data: any[] = res.docs
        .filter((doc) => doc.id !== user.id)
        .map((doc) => ({ id: doc.id, _ref: doc.ref, ...doc.data() }));
      // Success
      dispatch(setSessionsData(data));
    } catch (err: any) {
      console.log(err);
      // Failure
      dispatch(setSessionsLoading("error"));
    }
  }
);

export const openSessionConversation = createAsyncThunk(
  "chat/set-available-sessions",
  async (
    { participante, usuario }: { participante: UserDb; usuario: UserDb },
    { dispatch }
  ) => {
    try {
      const res = await SESSIONS.where("participantes", "array-contains-any", [
        participante,
        usuario,
      ]).get();

      if (res.docs.length > 0) {
        const session = {
          id: res.docs[0].id,
          _ref: res.docs[0].ref,
          ...res.docs[0].data(),
        } as Session;
        dispatch(setSessionSelected({ ...session } as any));
      } else {
        const session = {
          fechaCreacion: firebase.firestore.Timestamp.now(),
          participantes: [participante, usuario],
          usuariosActivos: [],
        };
        const resAdd = await SESSIONS.add(session);
        dispatch(
          setSessionSelected({
            id: resAdd.id,
            _ref: resAdd,
            ...session,
          } as any)
        );
      }
    } catch (err: any) {
      console.log(err);
      // Failure
    }
  }
);

export const openConversation = createAsyncThunk(
  "chat/set-chat-open-sessions",
  async (
    {
      session,
      user,
    }: { session: Session; user: FirebaseFirestoreTypes.DocumentReference },
    { dispatch }
  ) => {
    try {
      const sessionRes = await session._ref.get();
      const activeUsers = sessionRes.data()?.usuariosActivos;
      const activeMsgs = sessionRes.data()?.conversacionActiva;
      if (activeUsers && activeUsers.length > 0 && activeMsgs) {
        const messagesRef: any = activeMsgs;
        // Add user as active participant in session
        await session._ref.update({
          usuariosActivos: firebase.firestore.FieldValue.arrayUnion(user),
        });
        // Get all past messages except for active document
        dispatch(
          getSessionMessages({
            activeSession: session,
            activeChat: messagesRef,
          })
        );
        //
        // Listen chat messages for active session
        subscribedChat = messagesRef.onSnapshot((doc: any) => {
          const conversation = {
            id: doc.id,
            _ref: messagesRef,
            ...doc.data(),
          } as Conversation;
          dispatch(setChatActive(conversation)); // Actively updating
        });
      } else {
        // Add new document with newly created messages
        const messagesRef = await session._ref
          .collection("Conversaciones")
          .add({
            fechaCreacion: firebase.firestore.FieldValue.serverTimestamp(),
            mensajes: [],
          });
        // Add user as active participant in session
        await session._ref.update({
          conversacionActiva: messagesRef,
          usuariosActivos: firebase.firestore.FieldValue.arrayUnion(user),
        });
        // Get all past messages except for active document
        dispatch(
          getSessionMessages({
            activeSession: session,
            activeChat: messagesRef,
          })
        );
        //
        // Listen chat messages for active session
        subscribedChat = messagesRef.onSnapshot((doc) => {
          const conversation = {
            id: messagesRef.id,
            _ref: messagesRef,
            ...doc.data(),
          } as Conversation;
          dispatch(setChatActive(conversation)); // Actively updating
        });
      }
    } catch (err: any) {
      console.log("Some failure listening chat session");
      console.log(err);
      // Failure
    }
  }
);

export const getSessionMessages = createAsyncThunk(
  "chat/get-session-chat-messages",
  async (
    {
      activeSession,
      activeChat,
    }: {
      activeSession: Session;
      activeChat: FirebaseFirestoreTypes.DocumentReference;
    },
    { dispatch }
  ) => {
    try {
      const snapshot = await activeChat.get();
      const response = await activeSession._ref
        .collection("Conversaciones")
        .orderBy("fechaCreacion", "desc")
        .startAfter(snapshot)
        .get();

      const data: any[] = response.docs.map((doc) => ({
        id: doc.id,
        _ref: doc.ref,
        ...doc.data(),
      }));
      dispatch(setChatMessages(data));
    } catch (err: any) {
      console.log(err);
      // Failure
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  "chat/send-session-chat-message",
  async (
    {
      message,
      activeChat,
      userId,
    }: {
      message: string;
      activeChat: FirebaseFirestoreTypes.DocumentReference;
      userId: string;
    },
    { dispatch }
  ) => {
    try {
      await activeChat.update({
        mensajes: firebase.firestore.FieldValue.arrayUnion({
          texto: message,
          idUsuario: userId,
        }),
      });
    } catch (err: any) {
      console.log(err);
      // Failure
    }
  }
);

export const closeConversation = createAsyncThunk(
  "chat/close-chat-open-sessions",
  async (
    {
      activeSession,
      user,
    }: {
      activeSession: Session;
      user: FirebaseFirestoreTypes.DocumentReference;
    },
    { dispatch }
  ) => {
    try {
      // Remove selected active document with messages
      dispatch(setChatActive(null));
      // Stop listening for active updates in messages document
      subscribedChat && subscribedChat();
      // Remove user as active participant in session
      await activeSession._ref.update({
        usuariosActivos: firebase.firestore.FieldValue.arrayRemove(user),
      });
    } catch (err: any) {
      console.log(err);
      // Failure
    }
  }
);

export const setUsersLoading = createAsyncThunk(
  "chat/set-users-loading",
  (state: loadingState, { dispatch }) => dispatch(setUsersState(state))
);
export const setSessionsLoading = createAsyncThunk(
  "chat/set-sessions-loading",
  (state: loadingState, { dispatch }) => dispatch(setSessionsState(state))
);
export const setUsersData = createAsyncThunk(
  "chat/set-users-data",
  (data: UserDb[], { dispatch }) => dispatch(setUsers(data))
);
export const setSessionsData = createAsyncThunk(
  "chat/set-sessions-data",
  (data: Session[], { dispatch }) => dispatch(setSessions(data))
);
export const setUsersAddData = createAsyncThunk(
  "chat/set-users-add-data",
  (data: UserDb[], { dispatch }) => dispatch(setAddUsers(data))
);
export const setSessionsAddData = createAsyncThunk(
  "chat/set-sessions-add-data",
  (data: Session[], { dispatch }) => dispatch(setAddSessions(data))
);
export const setSessionSelected = createAsyncThunk(
  "chat/set-sessions-select-data",
  (data: Session | null, { dispatch }) => dispatch(setActiveSession(data))
);
export const setChatActive = createAsyncThunk(
  "chat/set-sessions-chat-active",
  (data: Conversation | null, { dispatch }) =>
    dispatch(setActiveConversation(data))
);
export const setChatMessages = createAsyncThunk(
  "chat/set-sessions-chat-messages",
  (data: Conversation[], { dispatch }) => dispatch(setChats(data))
);
