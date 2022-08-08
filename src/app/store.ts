import { configureStore } from "@reduxjs/toolkit";
import noteCardReducer from "../components/noteCardSlice";

const store = configureStore({
  reducer: {
    noteCard: noteCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
