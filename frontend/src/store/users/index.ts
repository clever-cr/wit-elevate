import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User } from "../../util/types";

const initialState: UserState = {
  new: null,
  isLoading: false,
  data: null,
  newUser: null,
  updatedUser:null
};

const userSlice = createSlice({
  name: "user",
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

export const userAction = userSlice.actions;
export default userSlice.reducer; 