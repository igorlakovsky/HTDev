import { addStorageNote, getStorageNotes } from "../app/localStorage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  data: getStorageNotes(),
  timezone: [],
  timezoneStatus: "",
  currentNoteStatus: "",
};

export const getTimezone = createAsyncThunk("notes/getTimezone", async () => {
  const response = await axios.get("https://worldtimeapi.org/api/timezone");
  return response.data;
});

export const addNote = createAsyncThunk("notes/addNote", async (note) => {
  const response = await axios.get(
    "https://worldtimeapi.org/api/timezone/" + note.tz
  );
  return response.data.datetime;
});

export const noteCardSlice = createSlice({
  name: "noteCard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTimezone.pending, (state, action) => {
        state.timezoneStatus = "loading";
      })
      .addCase(getTimezone.fulfilled, (state, action) => {
        state.timezoneStatus = "succeeded";
        state.timezone = action.payload;
      })
      .addCase(getTimezone.rejected, (state, action) => {
        state.timezoneStatus = "failed";
      })
      .addCase(addNote.pending, (state, action) => {
        state.currentNoteStatus = "loading";
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.currentNoteStatus = "succeeded";
        state.data.push({ ...action.meta.arg, date: action.payload });
        addStorageNote({ ...action.meta.arg, date: action.payload });
      })
      .addCase(addNote.rejected, (state, action) => {
        state.currentNoteStatus = "failed";
      });
  },
});

export const { cardAdded } = noteCardSlice.actions;

export const selectNotes = (state) => state.noteCard.data;
export const selectTimezone = (state) => state.noteCard.timezone;
export const selectTimezoneStatus = (state) => state.noteCard.timezoneStatus;
export const selectCurrentNoteStatus = (state) =>
  state.noteCard.currentNoteStatus;

export default noteCardSlice.reducer;
