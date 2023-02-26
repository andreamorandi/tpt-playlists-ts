import { Track } from "../../../core/types/playlistDetails";

export interface PlaylistShowTrackProps {
    track: Track;
};

export interface ShowHeaderPlaylist {
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
}

export interface PlaylistShowHeaderProps {
    playlist: ShowHeaderPlaylist;
};
