import { stringify } from 'query-string';
import { clientId, scope } from './';

/**
 * Global toLogin() function.
 * Redirects user to spotify login page with given scopes and redirect url.
 * User gets redirected to route /callback after successful login.
 */
export function toLogin() {
  const url = window.location;
  const req = {
    // change the clientID and scope in index.js
    client_id: clientId,
    redirect_uri: `${url.protocol}//${url.host}/callback`,
    scope,
    response_type: 'token',
  };

  // convert request to string
  const str = stringify(req);

  // redirect to spotify login page
  url.href = `https://accounts.spotify.com/authorize?${str}`;
}

/**
 * Global hasToken() function.
 * Checks if token is in local storage and returns a boolean.
 */
export function hasToken() {
  const storedToken = localStorage.getItem('spotify_token');
  return storedToken;
}

/**
 * Global getToken() function.
 * Extracts token from url and saves it to local storage.
 * Works only on /callback route as its the route
 * spotify redirects the user to after successful login.
 */
export function getToken() {
  const url = window.location.href;

  // get token from url
  const tokenFromurl = url.split('&token_type')[0].split('access_token=')[1];

  // store token in local storage
  localStorage.setItem('spotify_token', tokenFromurl);
}
