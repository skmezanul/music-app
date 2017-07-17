import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQDXYKx8j1sldLWVF8qfNaXFy3rc5fvm6EwMctYR3gjxTIyqgjdYtLo6drerUjvw38RGp_llpqrR83bK5KSsSA');

export default spotifyApi;
