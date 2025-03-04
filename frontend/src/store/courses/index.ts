import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  User } from "../../util/types";

const initialState: any = {
  isLoading: false,
  userCourses: null,
  newCourse:null

};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUserCourses(state, action: PayloadAction<User | null>) {
      state.userCourses = action.payload;
    },
    setNewCourse(state, action: PayloadAction<User | null>) {
      state.newCourse = action.payload;
    },
  },
});

export const  courseAction = courseSlice.actions;
export default courseSlice.reducer; 