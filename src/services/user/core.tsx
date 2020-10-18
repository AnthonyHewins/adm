export function sendCredentials(email: string, password: string, endpoint: string) {
  const req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password }),
  };

  return fetch(endpoint, req);
}
