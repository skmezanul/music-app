import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQBYu3s43uJh20Pgu4l4CTk2_Mjs_If1rtwBb78BmNG4csWBN7-gUwWbG7ISYnmAA7hB46nFw5dcyFpt91n0eNI4e8xvkJ6fw4yfw2syjXNeS_3eiZJNa-jgUIQtO43WfqgpxPGvOqTJsfbvmsX--_z7T19GM5JbCwLTAISF-5WaJMmUX7BkA1ShwbBTPESqEkwXJ9T6SwbnKdY');

export default spotifyApi;
