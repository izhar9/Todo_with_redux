import { createSlice } from "@reduxjs/toolkit";

export type user = {
    id: number;
    name: string;
    username: string;
    password?: string;
};

const initialState: { users: user[] } = {
  users: [],
};

const userSlice = createSlice({
  name: "loginData",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = [
        ...state.users,
        {
          id: Date.now(),
          ...action.payload,
        },
      ];
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;