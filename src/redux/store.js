import { configureStore } from "@reduxjs/toolkit";
import fantasyTeamReducer from "./fantasyTeamSlice";

export const store = configureStore({
  reducer: {
    fantasyTeam: fantasyTeamReducer,
  },
});
