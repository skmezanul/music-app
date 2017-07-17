import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQBGc7AnIdZe9iMsdgH6_HyQidV-WmrjJiscGCp36c244ZNQd0m-8q6_VdmURMLalSeGaopHW9koLg5nQmikXA');

export default spotifyApi;
