import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  data: [
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: "2022-10-02.2342-344232-5345345-UTF",
    },
  ],
  timezone: [],
  timezoneStatus: "idle",
};

export const getNotes = createAsyncThunk("notes/getNotes", async () => {
  const response = await axios.get("https://worldtimeapi.org/api/timezone");
  return response.data;
});

export const noteCardSlice = createSlice({
  name: "noteCard",
  initialState,
  reducers: {
    cardAdded: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getNotes.pending, (state, action) => {
        state.timezoneStatus = "loading";
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.timezoneStatus = "succeeded";
        state.timezone = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.timezoneStatus = "failed";
        // state.error = action.error.message
      });
  },
});

export const { cardAdded } = noteCardSlice.actions;

export const selectNotes = (state) => state.noteCard.data;
export const selectTimezone = (state) => state.noteCard.timezone;
export const selectTimezoneStatus = (state) => state.noteCard.timezoneStatus;

export default noteCardSlice.reducer;
