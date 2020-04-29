import {apiCall, ServerError} from '../core'
import {Matrix} from './matrix'

interface Polynomial {
    coef: number[]
}

export function polyreg(
    matrix:           Matrix,
    maxDeg:           number,
    successCallback:  (coef: number[]) => void,
    errCallback:      (err: ServerError) => void,
    decimalPlaces   = 3,
    endpoint        = "/api/v1/poly-reg"
): void {

    let data = {x: [], y: [], maxDeg: maxDeg};
    for (let i = 0; i < matrix.length; i++) {
        data.x.push(matrix.mat[i][0]);
        data.y.push(matrix.mat[i][1]);
    }

    const req = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }

    apiCall(
        fetch(endpoint, req),
        (r: Polynomial) => {
            const epsilon = Math.pow(10, -decimalPlaces)

            // Round away super small numbers
            for (let i = 0; i < r.coef.length; i++) {
                if (Math.abs(r.coef[i]) < epsilon)
                    r.coef[i] = 0;
            }

            successCallback(r.coef)
        },
        (e: ServerError) => {
            if (/near-singular/.test(e.message)) {
                e.message = "The data you provided is close to being a singular matrix. Make sure there are no duplicate x values, or add more data."
            }

            errCallback(new ServerError(e.code, e.message))
        }
    )
}
