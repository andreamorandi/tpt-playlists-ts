import { FC } from "react";
import { Link } from "react-router-dom";
import { List } from "immutable";
import Carousel from "react-multi-carousel";
import PlayButton from "../PlayButton";
import { formatNumber } from "../../core/helpers/format";
import { PlaylistListCarouselProps, CustomArrowProps } from "./types/playlistList";
import { Playlist } from "../../core/types/playlists";
import { ResponsiveType } from "react-multi-carousel";
import "../../styles/PlaylistList/PlaylistListCarousel.scss";

const PlaylistListCarousel: FC<PlaylistListCarouselProps> = (props) => {
    const playlists: List<Playlist> = props.playlists as List<Playlist>;
    return (
        <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
            customRightArrow={<CustomRightArrow onClick={() => {}} />}
            containerClass="carousel_container"
            itemClass="carousel-gutter"
        >
            {playlists.map((playlist) => {
                return (
                    <div key={playlist.id} className="slide">
                        <Link to={`/playlists/${playlist.id}`}>
                            <div className="image-wrapper">
                                <img src={playlist.picture_medium} alt={playlist.title} className="rounded" />
                                <PlayButton container='playlist' />
                            </div>
                            <p>{playlist.title === 'Estate 2023 - 2022 %u26f1%ufe0f Summer Hits' ? 'Estate 2023 - 2022 Summer Hits' : playlist.title}</p>
                            <span>{playlist.nb_tracks} brani - </span>
                            <span>{formatNumber(155000)} fan</span>
                        </Link>
                    </div>
                );
            })}
        </Carousel>
    );
};

const responsive: ResponsiveType = {
    superLargeDesktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 5,
        slidesToSlide: 5,
    },
    desktop: {
        breakpoint: { max: 1200, min: 900 },
        items: 4,
        slidesToSlide: 4,
    },
    tablet: {
        breakpoint: { max: 900, min: 625 },
        items: 3,
        slidesToSlide: 3,
    },
    mobile: {
        breakpoint: { max: 625, min: 0 },
        items: 2,
        slidesToSlide: 2,
    },
};

const CustomLeftArrow: FC<CustomArrowProps> = ({ onClick }) => {
    return <i className="fa-solid fa-chevron-left carousel-arrow arrow-left" onClick={onClick} />;
};

const CustomRightArrow: FC<CustomArrowProps> = ({ onClick }) => {
    return <i className="fa-solid fa-chevron-right carousel-arrow arrow-right" onClick={onClick} />;
};

export default PlaylistListCarousel;