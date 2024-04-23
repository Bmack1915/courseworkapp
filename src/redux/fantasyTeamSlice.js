import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
};

export const FantasyTeamSlice = createSlice({
  name: "fantasyTeam",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(
        (player) => player.playerId !== action.payload.playerId
      );
    },
    setFantasyPlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPlayer, removePlayer, setFantasyPlayers } =
  FantasyTeamSlice.actions;

export default FantasyTeamSlice.reducer;
