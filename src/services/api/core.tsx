export type Api= {
    code: string;
    message: string;
    data: any;
    err?: Error;
}

const apiCall = (url: string, data: any): Api => {
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

    }
}

const getRequest = (url: string): any => {
    return fetch(url).then(r => r.json())
}

const postRequest = (url: string, data: any): any => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    }).then(r => r.json())
}

const checkResponse = (resp: any) => {
    Object.keys(Api).forEach(field => {
        if (!resp[field]) throw new Error(`response missing field ${field}`)
    })
}

export default apiCall
