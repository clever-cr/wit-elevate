import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  new: null,
  isLoading: false,
  data: null,
  newUser: null,
  updatedUser:null,
  token:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setNew(state, action) {
      state.new = action.payload;
    },
    setNewUser(state, action) {
      state.newUser = action.payload;
    },
    setUpdatedUser(state,action){
      state.updatedUser = action.payload
    },
    setToken(state,action){
      state.token = action.payload
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;