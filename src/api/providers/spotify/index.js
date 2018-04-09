/* eslint-disable one-var */
import axios from 'axios';

// register spotify axios instance
export const spotify = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

// register spotify backend axios instance
export const spotifyBackend = axios.create({
  baseURL: 'https://spclient.wg.spotify.com/open-backend-2/v1/',
});
