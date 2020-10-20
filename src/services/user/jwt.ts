import apiCall from '../core';
import config from 'config';

export type JwtResponse = {
  token: string;
  expire: string;
}

const fetchJwt = async (): Promise<string> => {
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
  const jwt = await refreshToken(token)
  console.log(`got new token expiring at ${jwt.expire}.`);
  sessionStorage.setItem('jwt-token', jwt.token);
  sessionStorage.setItem('jwt-expiration', jwt.expire);
  return jwt.token;
}

async function refreshToken(token: string): Promise<{token: string, expire: string}> {
  return await fetch(config.refreshToken, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }).then(r => r.json())
}

export default fetchJwt
