import { createSlice } from "@reduxjs/toolkit";

const initialState: { username: string } = {
  username: "",
};

const loginUserSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {
    addLoginUser: (state, action) => {
      state.username = action.payload
    }
  },
});

export const { addLoginUser } = loginUserSlice.actions;
export default loginUserSlice.reducer;