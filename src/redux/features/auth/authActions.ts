import { firebase } from "@react-native-firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { auth, db } from "../../../config/firebase";
import { cleanString } from "../../../utils/utils";
import {
  setAuthState,
  setLoginState,
  setLoginValidation,
  setLogoutValidation,
  setSignupState,
} from "./authSlice";
import { authenticationState } from "./authTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadingState } from "../../../models/load-states";

const USERS = db.collection("Usuarios");

// function delay(delay: number) {
//   return new Promise((r) => {
//     setTimeout(r, delay);
//   });
// }

export const validateUser = createAsyncThunk(
  "auth/validate",
  async (form: { email: string; pass: string }, { dispatch }) => {
    try {
      dispatch(setLoadingLogin("submit"));
      // Validate user
      await auth.signInWithEmailAndPassword(form.email, form.pass);
      await AsyncStorage.setItem("@credentials", JSON.stringify(form));
      const ref = USERS.doc(auth.currentUser?.uid);
      const res = await ref.get();
      const data: any = { id: res.id, _ref: ref, ...res.data() };
      // Success
      dispatch(setLoginValidation(data));
    } catch (err: any) {
      console.log(err);
      let error = "Hubo un problema";
      if (err?.code === "auth/user-not-found") {
        error = "Email incorrecto";
      } else if (err?.code === "auth/wrong-password") {
        error = "Contraseña incorrecta";
      }
      // Failure
      dispatch(setLoadingLogin("error"));
      Alert.alert("Info", error);
    }
  }
);

export const createUser = createAsyncThunk(
  "auth/create",
  async (
    form: { nombre: string; email: string; pass: string },
    { dispatch }
  ) => {
    try {
      dispatch(setLoadingSignUp("submit"));
      // Create a new user
      const authRes = await auth.createUserWithEmailAndPassword(
        form.email,
        form.pass
      );

      await USERS.doc(authRes.user.uid).set({
        ...(({ pass, ...obj }) => obj)(form),
        _nombre: cleanString(form.nombre),
        fechaCreacion: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Success
      dispatch(setLoadingSignUp("success"));
    } catch (err: any) {
      console.log(err?.code);
      let error = "Hubo un problema";
      if (err?.code === "auth/email-already-in-use") {
        error = "Email se encuentra en uso";
      }
      // Failure
      dispatch(setLoadingSignUp("error"));
      Alert.alert("Info", error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout-user",
  async (_, { dispatch }) => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("@credentials");
      // Success
      dispatch(setLogoutValidation());
    } catch (err: any) {
      console.log("logging out");

      console.log(err);
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
