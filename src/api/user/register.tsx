import { apiCall, ApiAffirmative, AppAffirmative, AppError } from '../core';
import { sendCredentials } from './core';

export function register(
  email: string,
  password: string,
  onSuccess: (s: ApiAffirmative) => void,
  onError: (e: AppError) => void,
  endpoint = '/api/v1/register',
) {
  apiCall(
    sendCredentials(email, password, endpoint),
    (resp: ApiAffirmative) => onSuccess(new AppAffirmative(resp.message)),
    onError,
  );
}
