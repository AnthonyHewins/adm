export type Api= {
    code: string;
    message: string;
    data: any;
}

const apiCall = async (url: string, data: any): Api => {
    try {
        let resp;
        if (data) {
            resp = await getRequest(url, data)
        } else {
            resp = await postRequest(url, data)
        }

        checkResponse(resp)
        return resp
    } catch (e) {
        console.error(`Error hitting ${url} with payload ${data}:`)
        console.error(e)
        return {
            code: e.name,
            message: e.message,
        }
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
}

export default apiCall
