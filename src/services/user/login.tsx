import { apiCall, AppError } from 'services/core';
import { sendCredentials } from 'services/user/core';

export function login(
  email: string,
  password: string,
  onSuccess: (jwt: JwtResponse) => void,
  onError: (e: AppError) => void,
  endpoint = '/api/v1/auth/login',
) {
  apiCall(sendCredentials(email, password, endpoint), (r: JwtResponse) => onSuccess(r), onError);
}
