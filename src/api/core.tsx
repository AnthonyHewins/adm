import React from 'react'
import {Message} from 'semantic-ui-react'

export class Error {
    code:        string
    wasInternal: boolean

    constructor(code: string, wasInternal: boolean) {
        this.code = code
        this.wasInternal = wasInternal
    }
}

export class ServerResponse {
    msg: string
    err: Error | undefined

    constructor(msg: string, err?: Error) {
        this.msg = msg
        this.err = err
    }

    toMessage(): any {
        if (this.err == undefined) {
            return <Message success
                            header="Success"
                            message={this.msg} />
        }

        return <Message negative
                        header={`Error${this.err.wasInternal && " (this error was internal, may be a network issue)"}`}
                        message={this.msg} />
    }
}
