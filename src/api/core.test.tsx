import React from 'react'
import * as core from './core'
import {Message} from 'semantic-ui-react'

describe('ServerAffirmative', () => {
    describe('toMessage', () => {
        it('converts to a proper success message', () => {
            const h = "Success"
            const m = "usnfguids"

            const err = <Message success header={h} message={m} />

            const resp = new core.ServerAffirmative(m)

            expect(resp.toMessage()).toEqual(err)
        })

        it('converts to error message with internal error', () => {
            const h = "Error: code"
            const m = "usnfguids"

            const resp = new core.ServerAffirmative(
                undefined,
                new core.Error("code", m),
            )

            const err = <Message negative header={h} message={m} />

            expect(resp.toMessage()).toEqual(err)
        })
    })
})

describe("Error", () => {
    describe('toMessage', () => {
        it('converts to a proper error message', () => {
            const h = "randomcode"
            const m = "usnfguids"

            const err = <Message negative header={"Error: " + h} message={m} />

            const resp = new core.Error(h, m)

            expect(resp.toMessage()).toEqual(err)
        })
    })
})
