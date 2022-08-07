import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  data: [
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: {
        abbreviation: "GMT",
        client_ip: "89.250.166.226",
        datetime: "2022-08-07T20:21:44.115170+00:00",
        day_of_week: 0,
        day_of_year: 219,
        dst: false,
        dst_from: null,
        dst_offset: 0,
        dst_until: null,
        raw_offset: 0,
        timezone: "Africa/Abidjan",
        unixtime: 1659903704,
        utc_datetime: "2022-08-07T20:21:44.115170+00:00",
        utc_offset: "+00:00",
        week_number: 31,
      },
    },
    {
      text: "Текст записи",
      sign: "Подпись автора",
      tz: "",
      date: {
        abbreviation: "GMT",
        client_ip: "89.250.166.226",
        datetime: "2022-08-07T20:21:44.115170+00:00",
        day_of_week: 0,
        day_of_year: 219,
        dst: false,
        dst_from: null,
        dst_offset: 0,
        dst_until: null,
        raw_offset: 0,
        timezone: "Africa/Abidjan",
        unixtime: 1659903704,
        utc_datetime: "2022-08-07T20:21:44.115170+00:00",
        utc_offset: "+00:00",
        week_number: 31,
      },
    },
  ],
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
  return response.data;
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
