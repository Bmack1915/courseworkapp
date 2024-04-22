import { createSlice, current } from "@reduxjs/toolkit";

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
      const newPlayers = [...state.players];
      // console.log(current(newPlayers));
      console.log(state.players);
      console.log(action.payload);
      state.players = state.players.filter(
        (player) => player.playerId != action.payload.playerId
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPlayer, removePlayer } = FantasyTeamSlice.actions;

export default FantasyTeamSlice.reducer;
