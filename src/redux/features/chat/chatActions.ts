import { firebase } from "@react-native-firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { auth, db } from "../../../config/firebase";
import { cleanString } from "../../../utils/utils";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadingState } from "../../../models/load-states";
import { setAddUsers, setUsers, setUsersState } from "./chatSlice";
import { RootState } from "../../store/store";
import { UserDb } from "../../../models/usuario";

const SESSIONS = db.collection("Sesiones");
const USERS = db.collection("Usuarios");

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

export const setUsersLoading = createAsyncThunk(
  "chat/set-users-loading",
  (state: loadingState, { dispatch }) => dispatch(setUsersState(state))
);
export const setUsersData = createAsyncThunk(
  "chat/set-users-data",
  (data: UserDb[], { dispatch }) => dispatch(setUsers(data))
);
export const setUsersAddData = createAsyncThunk(
  "chat/set-users-add-data",
  (data: UserDb[], { dispatch }) => dispatch(setAddUsers(data))
);
