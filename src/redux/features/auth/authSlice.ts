import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { authenticationState } from "./authTypes";
import { UserDb } from "../../../models/usuario";
import { loadingState } from "../../../models/load-states";

// Define a type for the slice state
interface AuthState {
  signUpState: loadingState;
  loginState: loadingState;
  authState: authenticationState;
  user: UserDb | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  authState: "Unauthenticated",
  signUpState: "init",
  loginState: "init",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setAuthState: (state, { payload }: PayloadAction<authenticationState>) => {
      state.authState = payload;
    },
    setLoginState: (state, { payload }: PayloadAction<loadingState>) => {
      state.loginState = payload;
    },
    setSignupState: (state, { payload }: PayloadAction<loadingState>) => {
      state.signUpState = payload;
    },
    setLoginValidation: (state, { payload }: PayloadAction<UserDb>) => {
      state.signUpState = "init";
      state.loginState = "success";
      state.user = payload;
      state.authState = "Authenticated";
    },
    setLogoutValidation: (state, _: PayloadAction) => {
      state.signUpState = "init";
      state.loginState = "init";
      state.user = null;
      state.authState = "Unauthenticated";
    },
  },
});

export const {
  setAuthState,
  setLoginState,
  setSignupState,
  setLoginValidation,
  setLogoutValidation,
} = authSlice.actions;

// Other code such as selectors can use the imported RootState type
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
