import React from 'react';
import {Header, Container, Menu, Message, Icon} from 'semantic-ui-react';

export type ToolPageProps = {
    active: number,
    pages: React.ReactNode[],
    menuItems: string[],
}

const ToolPage = ({active = 0, pages, menuItems}: ToolPageProps) => {
    const [currentActive, setCurrentActive] = React.useState<number>(active)

    const btcAddress = process.env.REACT_APP_BITCOIN

    let menu = [];
    for (let i = 0; i < pages.length; i++) {
        menu.push(
            <Menu.Item key={i} active={currentActive === i}  onClick={() => setCurrentActive(i)} name={menuItems[i]} />
        );
    }

    return (
        <>
            <Header as="h1" textAlign='center'>
                <Header.Content className='strong'>
                    {name}
                </Header.Content>
            </Header>
            <Container>
                <Menu secondary>
                    {menu}
                </Menu>
                {pages[currentActive]}

                <Message icon>
                    <Icon color="yellow" name="bitcoin" />
                    <Message.Content>
                        <Message.Header>
                            If you like these free tools with no ads, help keep the lights on for this server anonymously.
                        </Message.Header>
                        <a href={`bitcoin:${btcAddress}?amount=0.000105`}>
                            {btcAddress}
                        </a>
                    </Message.Content>
                </Message>
            </Container>
        </>
    )
}

export default ToolPage
