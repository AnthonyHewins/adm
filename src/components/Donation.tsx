import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import config from '../config'

type DonationProps = {
  header?: React.ReactNode;
  amount?: number;
  children?: React.ReactNode;
};

const Donation: React.FC<DonationProps> = ({children}) => {
  console.log(process.env)
  return (
    <Message icon>
    <Icon color="yellow" name="bitcoin" />
    <Message.Content>
    <Message.Header>
    If you like these free tools with no ads, help keep the lights on for this server anonymously.
      </Message.Header>
    <a href={`bitcoin:${config.bitcoin}?amount=${config.bitcoinDonationAmount}`}>
    {config.bitcoin}
    </a>
    {children}
    </Message.Content>
    </Message>
  );
};

export default Donation;
