import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQCAw4IhQE1Oxwnv5vr_gIEhHf1pLpLVPdR9LXw2b_LoYkqftz-xCUoQXt-KL9IG5pP4i6VPPmees5Q-k32xjxzhCUowx9daEcnIFT_GIGWqdhnxPn2YDitsT-tMSz6-0wYK_mHjQIdfNNNOZ1zbZpiOfqMPJDnxJriGcPsHpJ_yRtoOTf6Esj5usf3VH_eo7Yw-joVA5w9NWyc');

export default spotifyApi;
