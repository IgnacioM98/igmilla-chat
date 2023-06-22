import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../../config/firebase";
import { cleanString } from "../../../utils/utils";

import { loadingState } from "../../../models/load-states";
import { Session } from "../../../models/session";
import { UserDb } from "../../../models/usuario";
import { RootState } from "../../store/store";
import {
  setActiveConversation,
  setActiveSession,
  setAddSessions,
  setAddUsers,
  setSessions,
  setSessionsState,
  setUsers,
  setUsersState,
} from "./chatSlice";
import { firebase } from "@react-native-firebase/firestore";
import { Conversation } from "../../../models/conversation";

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
        .map((doc) => ({ id: doc.id, _ref: doc, ...doc.data() }));
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
        .map((doc) => ({ id: doc.id, _ref: doc, ...doc.data() }));
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
  async (session: Session, { dispatch }) => {
    try {
      if (session?.conversacionActiva) {
        // TODO: UPDATE SESSION WITH CURRENT CHATTER ACTIVE
        subscribedChat = session.conversacionActiva.onSnapshot((doc) => {
          console.log("existing and listening");
          const conversation = {
            id: doc.id,
            _ref: session.conversacionActiva,
            ...doc.data(),
          } as Conversation;
          dispatch(setChatActive(conversation));
        });
      } else {
        const sessionRef = SESSIONS.doc(session.id);
        const resAdd = await sessionRef.collection("Conversaciones").add({
          fechaCreacion: firebase.firestore.FieldValue.serverTimestamp(),
          mensajes: [],
        });
        // TODO: UPDATE SESSION WITH CURRENT CHATTER ACTIVE
        subscribedChat = resAdd.onSnapshot((doc) => {
          console.log("created and listening");
          const conversation = {
            id: resAdd.id,
            _ref: resAdd,
            ...doc.data(),
          } as Conversation;
          dispatch(setChatActive(conversation));
        });
      }
    } catch (err: any) {
      console.log(err);
      // Failure
    }
  }
);
export const closeConversation = createAsyncThunk(
  "chat/close-chat-open-sessions",
  async (activeSession: Session, { dispatch }) => {
    try {
      subscribedChat && subscribedChat();
      // TODO: LOGIC LISTENER FOR ACTIVE SESSION FOR BOTH CHATTERS
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
