import * as core from '../src/api/core'
import React from 'react'
import {Message} from 'semantic-ui-react'

test('converts to a proper success message', () => {
    const h = "Success"
    const m = "usnfguids"

    const err = <Message success header={h} message={m} />

    const resp = new core.ServerResponse(m)

    expect(resp.toMessage()).toEqual(err)
})

test('successfully converts to error message with internal error', () => {
    const h = "Error (this error was internal, may be a network issue)"
    const m = "usnfguids"

    const err = <Message negative header={h} message={m} />

    const resp = new core.ServerResponse(
        m,
        new core.Error("code", true),
    )

    expect(resp.toMessage()).toEqual(err)
})
