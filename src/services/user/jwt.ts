import { apiCall, AppError } from '../core';

export type JwtResponse = {
  token: string;
  expire: string;
}

function fetchJwt(endpoint: string, errCallback = (e: AppError) => console.error(e)): string {
  const expiration = sessionStorage.getItem('jwt-expiration');

  if (expiration === null) {
    return null;
  }

  const unixTimestamp = Date.parse(expiration);
  if (isNaN(unixTimestamp)) {
    return null;
  }

  const token = sessionStorage.getItem('jwt-token');

  if (unixTimestamp > Date.now()) {
    if (token !== null) {
      return token;
    }

    // This logic only incurs when token is somehow null, but
    // the expiration is non-nil. In that case, clear the expiration, return false.
    // Better safe than sorry.
    sessionStorage.removeItem('jwt-expiration');
    return null;
  }

  console.log(`token expired at ${new Date(unixTimestamp)}, fetching new one...`);

  let newToken: string;
  refreshToken(
    token,
    (jwt: JwtResponse) => {
      console.log(`got new token expiring at ${jwt.expire}.`);
      sessionStorage.setItem('jwt-token', jwt.token);
      sessionStorage.setItem('jwt-expiration', jwt.expire);
    },
    errCallback,
    endpoint,
  );
  return newToken;
}

async function refreshToken(
  token: string,
  onSuccess: (jwt: JwtResponse) => void,
  onError: (e: AppError) => void,
  endpoint = '/api/v1/refresh_token',
) {
  const req = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  apiCall(fetch(endpoint, req), onSuccess, onError);
}

export default fetchJwt
