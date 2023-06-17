import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { authenticationState, loadingState } from "./authTypes";

// Define a type for the slice state
interface AuthState {
  signUpState: loadingState;
  loginState: loadingState;
  authState: authenticationState;
}

// Define the initial state using that type
const initialState: AuthState = {
  authState: "Unauthenticated",
  signUpState: "init",
  loginState: "init",
};

export const authSlice = createSlice({
  name: "counter",
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
  },
});

export const { setAuthState, setLoginState, setSignupState } =
  authSlice.actions;

// Other code such as selectors can use the imported RootState type
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
