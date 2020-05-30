import React from 'react'
import {Message, Icon,} from 'semantic-ui-react'

type DonationProps = {
    header?: React.ReactNode,
    amount?: number,
    children?: React.ReactNode,
}

const Donation = ({
    header = "If you like these free tools with no ads, help keep the lights on for this server anonymously.",
    amount = 0.000105,
    children = <>
        <br/>
        *address may change over time to protect privacy of donors
        <br/>
    </>
}: DonationProps) => {
    const btcAddress = process.env.REACT_APP_BITCOIN

    return (
        <Message icon>
            <Icon color="yellow" name="bitcoin" />
            <Message.Content>
                <Message.Header>
                    {header}
                </Message.Header>
                <a href={`bitcoin:${btcAddress}?amount=${amount}`}>
                    {btcAddress}
                </a>
                {children}
            </Message.Content>
        </Message>
    )
}

export default Donation
