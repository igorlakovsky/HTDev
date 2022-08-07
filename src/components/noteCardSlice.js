import { createSlice } from "@reduxjs/toolkit";

export const noteCardSlice = createSlice({
  name: "noteCard",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
      console.log(state.value);
    },
  },
});

export const { increment } = noteCardSlice.actions;

export default noteCardSlice.reducer;
