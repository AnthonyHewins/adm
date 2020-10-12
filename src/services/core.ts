type ApiResp = {
    message: string;
    status: number;
    data?: any;
}

export const request = (endpoint: string, body: any): ApiResp => {
    return fetch(
        endpoint,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        },
    )
}

export default request
