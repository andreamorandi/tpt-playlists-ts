import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPlaylists } from "../thunks/fetchPlaylists";
import { Playlists, PlaylistsState } from "../../types/playlists";
import { Map } from "immutable";

export const initialPlaylistsState: PlaylistsState = Map({
    data: {},
    isLoading: false,
    error: null,
}) as PlaylistsState;

const playlistsSlice = createSlice({
    name: 'playlists',
    initialState: initialPlaylistsState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchPlaylists.pending, (state) => {
            return state.set('isLoading', true)
        });
        builder.addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<Playlists>) => {
            return state
                .set('isLoading', false)
                .set('data', action.payload)
        });
        builder.addCase(fetchPlaylists.rejected, (state, action) => {
            return state
                .set('isLoading', false)
                .set('error', action.error);
        });
    },
});

export const playlistsReducer = playlistsSlice.reducer;