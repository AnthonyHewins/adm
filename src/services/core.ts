export type Api = {
    code: string;
    message: string;
    data?: any;
}

const apiCall = async (url: string, data?: any): Promise<Api> => {
    try {
        const resp = data ? await postRequest(url, data) : await getRequest(url)
        checkResponse(resp)
        return resp
    } catch (e) {
        console.error(`Error hitting ${url} with payload ${data}:`)
        console.error(e)
        throw e
    }
}

export const getRequest = (url: string): any => {
    return fetch(url).then(r => r.json())
}

export const postRequest = (url: string, data: any): any => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(r => r.json())
}

export const checkResponse = (resp: any) => {
    ['code', 'message'].forEach(field => {
        if (!(field in resp)) throw new Error(`response is missing required field ${field}`)
    })

    if (resp.code !== 'success') {
        throw new Error(resp.message)
    }
}

export default apiCall
