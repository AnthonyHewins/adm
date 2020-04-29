import {apiCall, ServerAffirmative, ServerError} from '../core'
import {sendCredentials} from './core'

export function register(
    email: string,
    password: string,
    onSuccess: (s: ServerAffirmative) => void,
    onError: (e: ServerError) => void,
    endpoint = "/api/v1/register")
{
    apiCall(
        sendCredentials(email, password, endpoint),
        onSuccess,
        onError
    )
}
