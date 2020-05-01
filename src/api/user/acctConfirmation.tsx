import {apiCall, ApiAffirmative, AppAffirmative, AppError} from '../core'

export function acctConfirmation(
    token: string,
    onSuccess: (s: AppAffirmative) => void,
    onError: (e: AppError) => void,
    endpoint = "/api/v1/confirm-acct")
{
    apiCall(
        fetch(`${endpoint}?token=${token}`),
        (resp: ApiAffirmative) => onSuccess(new AppAffirmative(resp.message)),
        onError
    )
}
