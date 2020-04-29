import {apiCall, ServerError} from '../core'
import { sendCredentials } from './core'

interface JwtResponse {
    token: string
}

export function login(email: string, password: string, onSuccess: (jwt: string) => void, onError: (e: ServerError) => void, endpoint = "/api/v1/auth") {
    apiCall(
        sendCredentials(email, password, endpoint),
        (r: JwtResponse) => onSuccess(r.token),
        onError,
    )
}
