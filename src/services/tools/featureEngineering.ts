import { Matrix } from './matrix';
import { apiCall} from '../core';
import config from 'config';

const featureEngineering = (m: Matrix, mode: Modes): Promise<number[][]> => {
    const resp = await apiCall(config.featureEngineering, {
        x: m.mat, mode: mode
    })

   return resp?.x
}

export default featureEngineering
