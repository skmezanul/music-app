/* eslint-disable one-var */
import axios from 'axios';

// register spotify backend axios instance
const spotifyBackend = axios.create({
  baseURL: 'https://spclient.wg.spotify.com/open-backend-2/v1/',
});

export default spotifyBackend;

export const getAdditionalArtistInfo = id => spotifyBackend({
  method: 'get',
  url: `/artists/${id}`,
});
