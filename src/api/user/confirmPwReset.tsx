import { apiCall, AppError, AppAffirmative, ApiAffirmative } from '../core';

export function confirmPwReset(
  token: string,
  newPassword: string,
  onSuccess: (x: AppAffirmative) => void,
  onError: (x: AppError) => void,
  endpoint: string,
) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: token, password: newPassword }),
  };

  apiCall(fetch(endpoint, req), (x: ApiAffirmative) => onSuccess(new AppAffirmative(x.message)), onError);
}
