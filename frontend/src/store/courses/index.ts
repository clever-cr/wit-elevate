import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  User } from "../../util/types";

const initialState: any = {
  new: null,
  isLoading: false,
  data: null,
  // newUser: null,
  // updatedUser:null
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setData(state, action: PayloadAction<User | null>) {
      state.data = action.payload;
    },
    setNew(state, action: PayloadAction<User | null>) {
      state.new = action.payload;
    },
    setNewUser(state, action: PayloadAction<User | null>) {
      state.newUser = action.payload;
    },
    setUpdatedUser(state,action: PayloadAction<User | null>){
      state.updatedUser = action.payload
    }
  },
});

export const  courseAction = courseSlice.actions;
export default courseSlice.reducer; 