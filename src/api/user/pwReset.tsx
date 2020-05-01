import { apiCall, AppError, AppAffirmative, ApiAffirmative} from '../core'

export function pwReset(email: string, onSuccess: (x: AppAffirmative) => void, onError: (e: AppError) => void, endpoint = "/api/v1/auth/reset_password") {
    const req = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
    }

    apiCall(
        fetch(endpoint, req),
        (x: ApiAffirmative) => onSuccess(new AppAffirmative(x.message)),
        onError,
    )
}
