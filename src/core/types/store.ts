import { PlaylistsState } from "./playlists";
import { PlaylistDetailsState } from "./playlistDetails";

export interface RootState {
    playlists: PlaylistsState;
    playlistDetails: PlaylistDetailsState;
}