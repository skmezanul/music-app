import * as SpotifyWebApi from 'spotify-web-api-js';

// I know you don't expose your api keys to the public. It's only temporary for development.

const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken('BQDQMMDhFOOkAqWqhYS2GTtYXfPY3AYhsbavYuQS8rvpVbJfbLhBnGQpNXNgkzmdIqNNNc2zx8nToYocLO5b1V7jve6z6fh2LEGsWvQ_pyM0HHFl_2sTParOatChrcEXYXN7wgaMSbX43qwkHYfJ1zMNKGt9OcvXIXAtos3-1O05O59dH6C_peF5FOgs5DgHsg2hSY1Z2fG8ryL-yTDQSqpRq_NaO40FpYWbd4_0gezX7wYs1RfRFTUkIkwGQJQipvE7e9LWaeX7_hVdMeRlqZo5wwlDyTFZN_U6xCNUUEFNMZPWZ6TS855SfPrlkig1qgQWGQ');

export default spotifyApi;
