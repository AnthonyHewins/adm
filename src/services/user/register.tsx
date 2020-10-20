import apiCall from '../core';
import config from 'config';

export function register(
  email: string,
  password: string,
) {
    const resp = apiCall(config.registration, {
        email: email, password: password
    })
}
