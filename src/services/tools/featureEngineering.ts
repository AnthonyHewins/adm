import Matrix from './matrix';
import {Modes} from 'stores/enums'
import apiCall, {Api} from '../core';
import config from 'config';

const featureEngineering = async (m: Matrix, mode: Modes): Promise<number[][]> => {
    const resp = await apiCall(config.featureEngineering, {
        x: m.mat, mode: mode
    })

    return parseResponse(resp)
}

export const parseResponse = (resp: Api): number[][] => {
    if (!resp?.data?.x) {
        console.error(`malformed response from server: ${resp}`)
        throw new Error(`server returned malformed response`)
    }

    return resp.data.x
}

export default featureEngineering
