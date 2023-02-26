import { List } from "immutable";
import { Playlist } from "../../../core/types/playlists";

export interface PlaylistListCarouselProps {
    playlists: List<Playlist>;
}

export interface CustomArrowProps {
    onClick: () => void;
};