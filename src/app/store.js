import { configureStore } from "@reduxjs/toolkit";
import noteCardReducer from "../components/noteCardSlice";

export default configureStore({
  reducer: {
    noteCard: noteCardReducer,
  },
});
