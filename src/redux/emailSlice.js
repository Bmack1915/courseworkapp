import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    value: "",
  },
  //Reducers are objects containing reducer functions
  reducers: {
    //Updates value field with payload of action
    setEmail: (state, action) => {
      state.value = action.payload; // Directly mutating the state is okay in Redux Toolkit due to Immer
    },
  },
});

export const { setEmail } = emailSlice.actions; // Export the action creator
export default emailSlice.reducer; // Export the reducer
