import {ServerResponse, Error} from './core'

export function register(email: string, password: string, endpoint = "/api/v1/register"): ServerResponse {
    const req: RequestInit = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: email, password: password})
    }

    let resp: ServerResponse | undefined
    fetch(endpoint, req)
        .then(r => {
            const payload: any = r.json()

            let err: Error | undefined
            if (!r.ok)
                err = new Error(payload.error, false)

            resp = new ServerResponse(payload.message, err)
        })
        .catch(e => {
            return new ServerResponse(
                e.toString(),
                new Error("internal", true)
            )
        })

    if (resp == undefined)
        return new ServerResponse(
            "Unable to fetch; something went wrong internally",
            new Error("null-resp", true)
        )
    else
        return resp
}
