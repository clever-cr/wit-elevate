import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users";
import courseReducer from "./courses"
import assessmentReducer from "./assessments"

export const store = configureStore({
  reducer: {
    user: userReducer,
    course: courseReducer,
    assessment: assessmentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 