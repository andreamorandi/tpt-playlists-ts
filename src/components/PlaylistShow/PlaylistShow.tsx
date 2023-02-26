import { FC, useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPlaylistDetails } from "../../core/store/store";
import { ThunkDispatch } from 'redux-thunk';
import { List } from "immutable";
import { AnyAction } from 'redux';
import { selectPlaylistDetails } from "../../core/store/store";
import { RootState } from "../../core/types/store";
import { Track } from "../../core/types/playlistDetails";
import Skeleton from "../Skeleton";
import PlaylistShowHeader from "./PlaylistShowHeader";
import PlaylistShowTrack from "./PlaylistShowTrack";
import "../../styles/PlaylistShow/PlaylistShow.scss";

const PlaylistShow: FC = () => {
    const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
    const playlistDetails = useSelector((state: RootState) =>
        (selectPlaylistDetails(state))
    );
    const { id } = useParams<{ id: string }>() || { id: '' };

    useEffect(() => {        
        if (!playlistDetails.getIn(['data', 'id']) || playlistDetails.getIn(['data', 'id']) !== parseInt(id)) {
            dispatch(fetchPlaylistDetails(id));
        }
    }, [id, playlistDetails, dispatch]);

    let content: ReactNode;
    if (playlistDetails.get('isLoading')) {
        content = (
            <div className="px-5 lg:px-10">
                <div className="flex justify-start gap-10 mt-5">
                <Skeleton times={1} className="h-52 w-52" />
                <Skeleton times={1} className="h-52 w-2/5" />
                </div>
                <div className="mt-14">
                <Skeleton times={10} className="h-14 w-full mt-4" />
                </div>
            </div>
        );
    } else if (playlistDetails.get('error')) {
        content = (
            <div>C'è stato un errore nel caricamento delle tracce.</div>
        );
    } else if (playlistDetails.getIn(['data', 'tracks'])) {
        
        const tracks: Track[] = playlistDetails.getIn(['data', 'tracks', 'data']) as Track[];
        const tracksList: List<Track> = List(tracks);

        content = (
            <>
                <PlaylistShowHeader playlist={playlistDetails.get('data')} />
                <main className="show">
                    <div className="ms_container">
                        <ul>{tracksList.map((track) => <li key={track.id}><PlaylistShowTrack track={track} /></li>)}</ul>
                    </div>
                </main>
            </>
        );
    };
    
    return <>{content || null}</>;
}

export default PlaylistShow;
