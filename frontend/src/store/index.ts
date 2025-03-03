import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users";
import courseReducer from "./courses"

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 