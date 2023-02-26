import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PlaylistDetails } from "../../types/playlistDetails";

const proxyUrl = 'http://0.0.0.0:8080';
const apiUrl = 'https://api.deezer.com/playlist';

const fetchPlaylistDetails = createAsyncThunk('playlistDetails/fetch', async (id: string) => {

    // Request after running the following proxy package: https://github.com/Spicy-Sparks/cors
    const response = await axios.get<PlaylistDetails>(`${proxyUrl}/${apiUrl}/${id}`);

    return response.data;
});

export { fetchPlaylistDetails };