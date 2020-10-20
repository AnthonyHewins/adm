import apiCall from '../core';
import config from 'config';

export function pwReset(
  email: string,
) {
    const resp = apiCall(config.passwordResetEndpoint, {
        email: email,
    })

}
