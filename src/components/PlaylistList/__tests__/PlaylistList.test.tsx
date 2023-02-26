import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import PlaylistList from "../PlaylistList";
import { PlaylistsState } from "../../../core/types/playlists";
import { Map } from "immutable";

const mockStore = configureMockStore([thunk]);

describe("PlaylistList", () => {
    afterEach(cleanup);

    it("renders 8 loading skeletons", () => {
        const store = mockStore({
            playlists: Map({
                isLoading: true,
                data: {},
                error: null
            }) as PlaylistsState,
        });
        render(
            <Provider store={store}>
                <PlaylistList />
            </Provider>
        );
        const skeletons: HTMLElement[] = screen.getAllByTestId("skeleton");
        expect(skeletons.length).toEqual(8);
    });

    it("renders a fetching error message", () => {
        const store = mockStore({
            playlists: Map({
                isLoading: false,
                data: {},
                error: true
            }) as PlaylistsState,
        });
        render(
            <Provider store={store}>
                <PlaylistList />
            </Provider>
        );
        const errorMessage: HTMLElement = screen.getByText("C'è stato un errore nel caricamento delle playlist.");
        expect(errorMessage).toBeTruthy();
    });

    it("renders 2 list sections", () => {
        const store = mockStore({
            playlists: Map({
                isLoading: false,
                data: {
                    data: [
                        {
                            id: 6045750124,
                            title: "Hits Estate",
                            picture_medium: "https://e-cdns-images.dzcdn.net/images/playlist/da795d10073e59fb5c5b715876465b57/250x250-000000-80-0-0.jpg",
                            nb_tracks: 50,
                        },
                        {
                            id: 324523,
                            title: "Hits Estate",
                            picture_medium: "https://e-cdns-images.dzcdn.net/images/playlist/da795d10073e59fb5c5b715876465b57/250x250-000000-80-0-0.jpg",
                            nb_tracks: 50,
                        },
                        {
                            id: 23523523,
                            title: "Hits Estate",
                            picture_medium: "https://e-cdns-images.dzcdn.net/images/playlist/da795d10073e59fb5c5b715876465b57/250x250-000000-80-0-0.jpg",
                            nb_tracks: 50,
                        },
                    ],
                },
                error: null
            }) as PlaylistsState,
        });
        render(
            <Provider store={store}>
                <PlaylistList />
            </Provider>
        );
        const playlistList: HTMLElement[] = screen.getAllByTestId("playlistList");
        expect(playlistList.length).toEqual(2);
    });
});