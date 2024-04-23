import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Use local storage as the default storage
import { persistStore, persistReducer } from "redux-persist";
import fantasyTeamReducer from "./fantasyTeamSlice";
import emailReducer from "./emailSlice";

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  fantasyTeam: fantasyTeamReducer,
  email: emailReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["email"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor for the store
const persistor = persistStore(store);

export { store, persistor };
