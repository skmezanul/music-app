import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQCk28CBRGB6EGsKocix_-QJuE0fxJ-gKlziBiPAPoHwjhyGWxH0cDN6RyayycAWRVrfSO-_fj0P-LSDf26jOvcNapC_wmNJOCv6MKo38RXprnJ3dVkywqM87bu-oRIa7NIDexcJiBEzwYaf_OJcgNIa9PAcRxNL6UYLKIjHNj7LIJ8kjkNaQkG7E_nTPD0NsHZ9jSc_mnQFoxE');

export default spotifyApi;
