import {apiCall, AppError} from '../core'
import { sendCredentials } from './core'
import { JwtResponse }     from './jwt'

export function login(email: string, password: string, onSuccess: (jwt: JwtResponse) => void, onError: (e: AppError) => void, endpoint = "/api/v1/auth/login") {
    apiCall(
        sendCredentials(email, password, endpoint),
        (r: JwtResponse) => onSuccess(r),
        onError,
    )
}
