import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadingState } from "../../../models/load-states";
import { RootState } from "../../store/store";
import { UserDb } from "../../../models/usuario";

// Define a type for the slice state
interface ChatState {
  usersState: loadingState;
  usersList: UserDb[];
  sessionsState: loadingState;
  sessionsList: any[];
}

// Define the initial state using that type
const initialState: ChatState = {
  usersState: "init",
  usersList: [],
  sessionsState: "init",
  sessionsList: [],
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
    setSessions: (state, { payload }: PayloadAction<any[]>) => {
      state.sessionsList = payload;
      state.sessionsState = "success";
    },
    setAddSessions: (state, { payload }: PayloadAction<any[]>) => {
      state.sessionsList = [...state.sessionsList, ...payload];
      state.sessionsState = "success";
    },
  },
});

export const {
  setUsersState,
  setSessionsState,
  setUsers,
  setAddUsers,
  setSessions,
} = chatSlice.actions;

// Other code such as selectors can use the imported RootState type
export const chatSelector = (state: RootState) => state.chat;

export default chatSlice.reducer;
