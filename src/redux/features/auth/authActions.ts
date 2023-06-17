import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthState, setLoginState, setSignupState } from "./authSlice";
import { authenticationState, loadingState } from "./authTypes";

function delay(delay: number) {
  return new Promise((r) => {
    setTimeout(r, delay);
  });
}

export const validateUser = createAsyncThunk(
  "auth/validate",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoadingLogin("submit"));
      // Create a new user
      await delay(1000);
      // Success
      dispatch(setLoadingLogin("success"));
      dispatch(setAuthentication("Authenticated"));
    } catch (err) {
      console.log(err);
      // Failure
      dispatch(setLoadingLogin("error"));
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/create",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoadingSignUp("submit"));
      // Create a new user

      // Success
      dispatch(setLoadingSignUp("success"));
    } catch (err) {
      console.log(err);
      // Failure
      dispatch(setLoadingSignUp("error"));
    }
  }
);

export const setAuthentication = createAsyncThunk(
  "auth/set-auth",
  (state: authenticationState, { dispatch }) => dispatch(setAuthState(state))
);
export const setLoadingLogin = createAsyncThunk(
  "auth/loading-login",
  (s: loadingState, { dispatch }) => dispatch(setLoginState(s))
);
export const setLoadingSignUp = createAsyncThunk(
  "auth/loading-signup",
  (s: loadingState, { dispatch }) => dispatch(setSignupState(s))
);
