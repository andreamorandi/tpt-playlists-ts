import { FC, useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../../core/store/store";
import { ThunkDispatch } from 'redux-thunk';
import { List } from "immutable";
import { AnyAction } from 'redux';
import { selectPlaylists } from "../../core/store/store";
import { RootState } from "../../core/types/store";
import { Playlist } from "../../core/types/playlists";
import Skeleton from "../Skeleton";
import PlaylistListCarousel from "./PlaylistListCarousel";
import "react-multi-carousel/lib/styles.css";
import "../../styles/PlaylistList/PlaylistList.scss";

const PlaylistList: FC = () => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const playlists = useSelector((state: RootState) =>
        (selectPlaylists(state))
    );

    useEffect(() => {
        if (!playlists.getIn(['data', 'data'])) dispatch(fetchPlaylists());
    }, [playlists, dispatch]);

    let content: ReactNode;
    if (playlists.get('isLoading')) {
        content = <div className="px-5 lg:px-10">
            <div className="flex justify-center gap-6 md:gap-10 mt-24">
                <Skeleton times={4} className="h-32 w-32 md:h-52 md:w-52 lg:h-72 lg:w-72" />
            </div>
            <div className="flex justify-center gap-6 md:gap-10 mt-24">
                <Skeleton times={4} className="h-32 w-32 md:h-52 md:w-52 lg:h-72 lg:w-72" />
            </div>
        </div>;
    } else if (playlists.get('error')) {
        content = <div>C'è stato un errore nel caricamento delle playlist.</div>;
    } else if (playlists.getIn(['data', 'data'])) {

        const playlistsData: Playlist[] = playlists.getIn(['data', 'data']) as Playlist[];
        const playlistList: List<Playlist> = List(playlistsData);
        
        const midpoint = Math.ceil(playlistList.size / 2);
        const playlistsFirstHalf = playlistList.slice(0, midpoint);
        const playlistsSecondHalf = playlistList.slice(midpoint);
        
        content = <>
            <main className="list">
                <div className="ms_container">
                    <section data-testid="playlistList" className="playlist-list-section">
                        <h2 className="section-title">Le migliori playlist pop</h2>
                        <PlaylistListCarousel playlists={playlistsFirstHalf} />
                    </section>
                    <section data-testid="playlistList" className="playlist-list-section">
                        <h2 className="section-title">Pop per ogni momento</h2>
                        <PlaylistListCarousel playlists={playlistsSecondHalf} />
                    </section>
                </div>
            </main>
        </>;
    };

    return <>{content}</>;
};

export default PlaylistList;