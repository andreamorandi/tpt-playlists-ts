import { SerializedError } from "@reduxjs/toolkit";
import { Map } from "immutable";

export interface Playlist {
    id: number;
    title: string;
    nb_tracks: number;
    picture_medium: string;
};

export interface Playlists {
    data: Playlist[];
}

export interface PlaylistsState extends Map<string, any> {
    isLoading: boolean;
    data: Playlists;
    error: SerializedError | null;
};