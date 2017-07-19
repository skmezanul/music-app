import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQAPdiCoPxBKTxgLdXoBJYREmmBRoI68xc55TzWLran3RM7v7DkrOKvyF4HuZL-Cw9MhoHnmPbWHDYS_gpTcoJRsKmKuSBuMRFiNrFuwvhjpugClNWTArAh02xSj8977J7yRfvCWruCBprj_V9I1sM0Y45oNMBL8tslWAPu1HeFQArPhZspY7Ui3pXa4m7J1Qd8d3yZRW6b2JCA');

export default spotifyApi;
