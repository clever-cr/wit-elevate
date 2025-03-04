import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  User } from "../../util/types";

const initialState: any = {
  isLoading: false,
  newAssessment: null,
  allAssessment:null,
selectedAssessment:null,
submitedAnswer:null
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setNewAssessment(state, action: PayloadAction<User | null>) {
      state.newAssessment = action.payload;
    },
    setAllAssessment(state, action: PayloadAction<User | null>) {
      state.allAssessment = action.payload;
    },
    setSelcectedAssessment(state, action: PayloadAction<User | null>) {
      state.selectedAssessment = action.payload;
    },
    setSubmitedAnswer(state, action: PayloadAction<User | null>) {
      state.submitedAnswer = action.payload;
    },
  },
});

export const  assessmentAction = assessmentSlice.actions;
export default assessmentSlice.reducer; 