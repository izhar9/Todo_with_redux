import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/signUpSlice";
import loginUserReducer from "../Features/loginSlice"

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const signupPersistConfig = {
  key: "signup",
  storage,
};

const loginPersistConfig = {
  key: "login",
  storage,
};

const persistedReducer = persistReducer(signupPersistConfig, userReducer);
const persistedLoginReducer = persistReducer(loginPersistConfig, loginUserReducer);

export const store = configureStore({
  reducer: {
    signUpdata: persistedReducer,
    logindata: persistedLoginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);