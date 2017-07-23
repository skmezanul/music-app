import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQBkxvJYI8X_49IErtiU12yKSCH4IlOFcmCvMBt3wkhNbk-XWB6H8GfPUBu9T_VrHo8JJtA3eoL8pGq7ccBOk2_nwPl4cpl0wv1xlvOIg5ZBpPFl79dJeYPug99PVddJis_0TqLnea66WjupBSX7ZK1ZxhHBg25QMUv3w51hvO3EjPGWiiFucbPB6b5n4ZN6XVMaldTyVL63_IfDI_aqcEKVoVuseiGtin4YZdb6tzzJQUaEhgBdUdYGyaQ3Yxl8BLYivCcfzzvKoFKD1L4N-3cH27FEQ7Xd5YxmaEUTSjM50YKebcMQmaqzbC6LOHGmn4zJ1A');

export default spotifyApi;
