import {Matrix} from './matrix'
import {apiCall, ServerError} from '../core'

export enum Modes {
    meanNormalization = 'mean-normalization',
    zScore            = 'zscore',
}

type FeatureEngineeringResponse = {x: number[][]}

export function featureEngineering(
    m: Matrix,
    mode: Modes,
    onSuccess: (x: number[][]) => void,
    onError: (x: ServerError) => void,
    endpoint = "/api/v1/tools/feature-engineering"
) {
    const req: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({x: m.mat, mode: mode}),
    }

    apiCall(
        fetch(endpoint, req),
        (r: FeatureEngineeringResponse) => onSuccess(r.x),
        onError
    )
}
