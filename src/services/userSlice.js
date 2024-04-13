import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    setFilterUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser,setFilterUser } = usersSlice.actions;

export default usersSlice.reducer;
