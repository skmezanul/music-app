import * as SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi()

// Your api token goes here. You can get it from
// https://developer.spotify.com/web-api/console/post-next/
// Remember to grant all permissions for the app to work properly.
spotifyApi.setAccessToken('')
// I know you don't expose your api keys to the public. It's only temporary for development.

export default spotifyApi
