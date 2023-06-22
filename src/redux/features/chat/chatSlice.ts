import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadingState } from "../../../models/load-states";
import { RootState } from "../../store/store";
import { UserDb } from "../../../models/usuario";
import { Session } from "../../../models/session";
import { Conversation } from "../../../models/conversation";

// Define a type for the slice state
interface ChatState {
  usersState: loadingState;
  usersList: UserDb[];
  sessionsState: loadingState;
  sessionsList: Session[];
  selectedSession: Session | null;
  activeChat: Conversation | null;
  chatsList: Conversation[];
}

// Define the initial state using that type
const initialState: ChatState = {
  usersState: "init",
  usersList: [],
  sessionsState: "init",
  sessionsList: [],
  selectedSession: null,
  activeChat: null,
  chatsList: [],
};

export const chatSlice = createSlice({
  name: "chat",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setUsersState: (state, { payload }: PayloadAction<loadingState>) => {
      state.usersState = payload;
    },
    setUsers: (state, { payload }: PayloadAction<UserDb[]>) => {
      state.usersList = payload;
      state.usersState = "success";
    },
    setAddUsers: (state, { payload }: PayloadAction<UserDb[]>) => {
      state.usersList = [...state.usersList, ...payload];
      state.usersState = "success";
    },
    setSessionsState: (state, { payload }: PayloadAction<loadingState>) => {
      state.sessionsState = payload;
    },
    setSessions: (state, { payload }: PayloadAction<Session[]>) => {
      state.sessionsList = payload;
      state.sessionsState = "success";
    },
    setAddSessions: (state, { payload }: PayloadAction<Session[]>) => {
      state.sessionsList = [...state.sessionsList, ...payload];
      state.sessionsState = "success";
    },
    setActiveSession: (state, { payload }: PayloadAction<Session | null>) => {
      state.selectedSession = payload;
    },
    setActiveConversation: (
      state,
      { payload }: PayloadAction<Conversation | null>
    ) => {
      state.activeChat = payload;
    },
    setChats: (state, { payload }: PayloadAction<Conversation[]>) => {
      state.chatsList = payload;
    },
  },
});

export const {
  setUsersState,
  setSessionsState,
  setUsers,
  setAddUsers,
  setSessions,
  setAddSessions,
  setActiveSession,
  setActiveConversation,
  setChats,
} = chatSlice.actions;

// Other code such as selectors can use the imported RootState type
export const chatSelector = (state: RootState) => state.chat;

export default chatSlice.reducer;
