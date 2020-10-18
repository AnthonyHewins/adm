import apiCall from 'services/core';
import config from 'config';

const confirmPwReset = async (
    token: string,
    newPassword: string,
): void => {
    const resp = await apiCall(config.passwordResetEndpoint, {
        token: token, password: newPassword
    })
}

export default confirmPwReset
