import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
  selectedPlayerToAdd: null,
  selectedPlayerToRemove: null,
};

export const FantasyTeamSlice = createSlice({
  name: "fantasyTeam",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
      state.selectedPlayerToAdd = null;
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(
        (player) => player.playerId !== action.payload.playerId
      );
      state.selectedPlayerToRemove = null;
    },
    setFantasyPlayers: (state, action) => {
      state.players = action.payload;
    },

    setSelectedPlayerToAdd: (state, action) => {
      state.selectedPlayerToAdd = action.payload;
    },

    setSelectedPlayerToRemove: (state, action) => {
      state.selectedPlayerToRemove = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addPlayer,
  removePlayer,
  setFantasyPlayers,
  setSelectedPlayerToAdd,
  setSelectedPlayerToRemove,
} = FantasyTeamSlice.actions;

export default FantasyTeamSlice.reducer;
