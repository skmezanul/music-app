import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQAh4stawYQ13oYoluf2WEOgwKPKLejdNP6Bw62xtNF3Q0Qu3zx3ffSrkzs4dGR5wrFfO2FW7CV9kr5l_Wij9g');

export default spotifyApi;
