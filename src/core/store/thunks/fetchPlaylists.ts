import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Playlists } from "../../types/playlists";

const proxyUrl = 'http://0.0.0.0:8080';
const apiUrl = 'https://api.deezer.com/chart/0/playlists?limit=30';

const fetchPlaylists = createAsyncThunk('playlists/fetch', async () => {

    // Request after running the following proxy package: https://github.com/Spicy-Sparks/cors
    const response = await axios.get<Playlists>(`${proxyUrl}/${apiUrl}`);

    return response.data;
});

export { fetchPlaylists };