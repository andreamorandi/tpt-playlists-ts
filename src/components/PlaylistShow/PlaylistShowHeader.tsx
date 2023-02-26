import { FC } from "react";
import { secondsToHoursAndMinutes } from "../../core/helpers/time";
import { formatNumber } from "../../core/helpers/format";
import { PlaylistShowHeaderProps, ShowHeaderPlaylist } from "./types/playlistShow";
import "../../styles/PlaylistShow/PlaylistShowHeader.scss";

const PlaylistShowHeader: FC<PlaylistShowHeaderProps> = (props) => {
    const playlist: ShowHeaderPlaylist = props.playlist;
    return (
        <header>
            <div className="header-top">
                <div className="header-left">
                    <img src={playlist.picture_medium} alt={playlist.title} className="playlist-image" />
                </div>
                <div className="header-right">
                    <h1>{playlist.title === 'Estate 2023 - 2022 %u26f1%ufe0f Summer Hits' ? 'Estate 2023 - 2022 Summer Hits' : playlist.title}</h1>
                    <div className="creator">
                        <i className="fa-solid fa-user"></i>
                        {playlist.creator && <p>{playlist.creator.name}</p>}
                    </div>
                    <div className="details">
                        <p>{playlist.description === 'Le hit del momento e tormentoni del passato %ud83d%udca5' ? 'Le hit del momento e tormentoni del passato.' : playlist.description}</p>
                        <span>{playlist.nb_tracks} brani - </span>
                        <span>{secondsToHoursAndMinutes(playlist.duration)} - </span>
                        <span>{formatNumber(playlist.fans)} fan - </span>
                        <span>Aggiornato: ieri</span>
                    </div>
                    <div className="actions">
                        <div className="play-button-xl">
                            <i className="fa-regular fa-circle-play"></i>
                            <span>Ascolta</span>
                        </div>
                        <div className="circle">
                            <i className="fa-regular fa-heart"></i>
                        </div>
                        <div className="circle">
                            <i className="fa-solid fa-share"></i>
                        </div>
                        <div className="circle">
                            <i className="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="grid grid-cols-11 gap-4">
                    <div className="col-start-1 col-end-6 ml-5"><span>Brano</span></div>
                    <div className="col-start-8 col-end-10"><span>Artista</span></div>
                    <div className="col-start-10 col-end-12 grid grid-cols-2 gap-2">
                        <div className="col-start-1 col-end-2">
                            <i className="fa-regular fa-clock"></i>
                        </div>
                        <div className="col-start-2 col-end-3 text-center">
                            <i className="fa-regular fa-square square"></i>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PlaylistShowHeader;