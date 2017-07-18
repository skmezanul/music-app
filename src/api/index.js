import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQA5V0o5cZEJvZln-wAJRcu3BVDuryMY66g18o1eWWgCiFbnWAftt0ExAgXQxGFonpo5O6jc7lulQGr6PsCzYLWp-NSoWINRh7VezAbFM4WSizob8W4F2tSzVU9AgHgOwwB2TscbuAEUUZH2d0e0ONIxYUjmyYTtQIWFlv1RE08Tpv6evI9CZ-xDdXOSoW9dFUPkV1a3VuaUL4E');

export default spotifyApi;
