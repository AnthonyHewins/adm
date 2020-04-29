import React from 'react'
import {Message} from 'semantic-ui-react'

export interface ApiError {
    code:    string,
    message: string,
}

export function apiCall<T>(fetchPromise: Promise<any>, success: (x: T) => void, err: (e: ServerError) => void) {
    const errorHandler = (code: string) => {
        return (e: Error) => {
            console.error(e)
            err(new ServerError(code, e.toString()))
        }
    }

    fetchPromise.then(r => {
            if (r.ok)
                r.json().then(r => r as T)
                 .then((r: T) => success(r))
                 .catch(errorHandler('error-handling-ok-api-resp'))
            else
                r.json().then(r => r as ApiError)
                 .then((r: ApiError) => err(new ServerError(r.code, r.message)))
                 .catch(errorHandler('error-handling-api-error'))
        })
        .catch(errorHandler('internal'))
}

export class ServerError implements ApiError {
    public code:    string
    public message: string

    constructor(code: string, message: string) {
        this.code = code
        this.message  = message
    }

    toMessage() {
        return <Message negative>
            <Message.Header>Error: {this.code}</Message.Header>
            {this.message}
        </Message>
    }
}

// General affirmative responses where the server generally just sends a string back
export class ServerAffirmative {
    public message: string
    public err?:    ServerError

    constructor(message: string, err?: ServerError) {
        this.message = message
        this.err = err
    }

    toMessage(): any {
        if (this.err == undefined) {
            return <Message success header="Success" message={this.message} />
        }
       
        return this.err.toMessage()
    }
}
