import { SerializedError } from "@reduxjs/toolkit";
import { Map } from "immutable";

interface Artist {
    id: number;
    name: string;
};
  
interface Album {
    id: number;
    title: string;
    cover_small: string;
};

export interface Track {
    id: number;
    title: string;
    duration: number;
    artist: Artist;
    album: Album;
};

export interface PlaylistDetails {
    id: number;
    title: string;
    description: string;
    duration: number;
    nb_tracks: number;
    fans: number;
    picture_medium: string;
    creator: {
        id: number;
        name: string;
    };
    tracks: {
        data: Track[];
    };
};

export interface PlaylistDetailsState extends Map<string, any> {
    isLoading: boolean;
    data: PlaylistDetails;
    error: SerializedError | null;
};
