import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux/es/types";
// import authReducer from "../features/auth/authSlice";
// import navHelpReducer from "../features/navhelp/navhelpSlice";
// import locationsReducer from "../features/locations/locationsSlice";
// import profileReducer from "../features/profile/profileSlice";
// import addressReducer from '../features/addresses/addressSlice'

const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      // auth: authReducer,
      // navhelp: navHelpReducer,
      // locations: locationsReducer,
      // profile: profileReducer,
      // address: addressReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  return store;
};

const store = configureAppStore();

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain useDispatch and useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
