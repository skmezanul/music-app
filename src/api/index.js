import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQAB6XbmVp_J8-3XQpZkixD-h8d5WSeRmkCIlYiOMvYMeY1U6nQEAMO9mHyk3qmJTvDwbIWgXGnLFtoF4INjfxFup8b-ILM4kpNDKr0T6IrOvLMrvfHOOD5M4aWI-TXQfCYOcw3FHk5VgxYCx9l4tby5BNeXzFZ2Zt3_q_6IoU24sQ2RmWhejVYWCIVEGAEnZDqaPWoYTA75-rY');

export default spotifyApi;
