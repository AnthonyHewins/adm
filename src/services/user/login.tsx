import apiCall from 'services/core';
import config from 'config';

const login = async (email: string,  password: string): Promise<string> => {
    const resp = await apiCall(config.login, {
        email: email, password: password
    })

    if (resp?.data?.token) {
        return resp.data.token
    }

    throw new Error('failed getting token')
}

export default login
