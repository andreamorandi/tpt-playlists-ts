import { render, cleanup, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import PlaylistShow from "../PlaylistShow";
import { PlaylistDetailsState } from "../../../core/types/playlistDetails";
import { Map } from "immutable";

jest.mock("react-router-dom", () => ({
    useParams: () => ({ id: "6045750124" })
}));

const mockStore = configureMockStore([thunk]);

describe("PlaylistShow", () => {
    afterEach(cleanup);

    it("renders 12 loading skeletons", () => {
        const store = mockStore({
            playlistDetails: Map({
                isLoading: true,
                data: {},
                error: null
            }) as PlaylistDetailsState,
        });
        render(
            <Provider store={store}>
                <PlaylistShow />
            </Provider>
        );
        const skeletons: HTMLElement[] = screen.getAllByTestId("skeleton");
        expect(skeletons.length).toEqual(12);
    });

    it("renders a fetching error message", () => {
        const store = mockStore({
            playlistDetails: Map({
                isLoading: false,
                data: {},
                error: true
            }) as PlaylistDetailsState,
        });
        render(
            <Provider store={store}>
                <PlaylistShow />
            </Provider>
        );
        const errorMessage: HTMLElement = screen.getByText("C'è stato un errore nel caricamento delle tracce.");
        expect(errorMessage).toBeTruthy();
    });

    it("renders a track", () => {
        const store = mockStore({
            playlistDetails: Map({
                isLoading: false,
                data: {
                    id: 6045750124,
                    title: "Hits Estate",
                    picture_medium: "https://e-cdns-images.dzcdn.net/images/playlist/da795d10073e59fb5c5b715876465b57/250x250-000000-80-0-0.jpg",
                    description: "Goditi il ​​suono dell'estate con i successi del momento.",
                    nb_tracks: 50,
                    duration: 9509,
                    fans: 9293,
                    creator: {
                        id: 304159715,
                        name: "Fran - Deezer Editor Italia",
                    },
                    tracks: {
                        data: [
                            {
                                id: 1705986647,
                                title: "Ferrari",
                                duration: 186,
                                artist: {
                                    id: 8205210,
                                    name: "James Hype",
                                },
                                album: {
                                    id: 307700657,
                                    title: "Ferrari",
                                    cover_small: "https://e-cdns-images.dzcdn.net/images/cover/d840cb39e0cd999d372bfee6addb07ec/56x56-000000-80-0-0.jpg",
                                }
                            }
                        ],
                    },
                },
                error: null
            }) as PlaylistDetailsState,
        });
        render(
            <Provider store={store}>
                <PlaylistShow />
            </Provider>
        );
        const track: HTMLElement = screen.getByTestId("track");
        expect(track).toBeTruthy();
    });
});