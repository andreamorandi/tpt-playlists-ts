import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Action } from "redux";
import { playlistsReducer } from "./slices/playlistsSlice";
import { playlistDetailsReducer } from "./slices/playlistDetailsSlice";
import { createSelector } from "reselect";
import Immutable from "immutable";
import { immutable } from '@redux-devtools/serialize';
import { RootState } from "../types/store";
import { initialPlaylistsState } from "./slices/playlistsSlice";
import { initialPlaylistDetailsState } from "./slices/playlistDetailsSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const { stringify, parse } = immutable(Immutable);

const initialState: RootState = {
  playlists: initialPlaylistsState,
  playlistDetails: initialPlaylistDetailsState,
};

const rootReducer = (state = initialState, action: Action) => {
  return {
    playlists: playlistsReducer(state.playlists, action),
    playlistDetails: playlistDetailsReducer(state.playlistDetails, action),
  };
};

const transform = createTransform(
  (inboundState) => {
    const serialized = stringify(inboundState);
    return serialized;
  },
  (outboundState) => {
    const parsed = parse(outboundState);
    return parsed;
  },
  { whitelist: ["playlists", "playlistDetails"] }
);

const persistConfig = {
  key: "root",
  storage,
  transforms: [transform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };

const getPlaylistsState = (state: RootState) => state.playlists;

export const selectPlaylists = createSelector(
  [getPlaylistsState],
  (playlists) => playlists
);

const getPlaylistDetailsState = (state: RootState) => state.playlistDetails;

export const selectPlaylistDetails = createSelector(
  [getPlaylistDetailsState],
  (playlistDetails) => playlistDetails
);

export * from "./thunks/fetchPlaylists";
export * from "./thunks/fetchPlaylistDetails";