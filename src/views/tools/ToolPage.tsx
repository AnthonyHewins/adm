import React from 'react';
import {Header, Container, Menu, Message, Icon} from 'semantic-ui-react';

export function ToolPage(props) {
  const [active, setActive] = React.useState(props.active);

  let menu = [];
  for (let i = 0; i < props.pages.length; i++) {
    menu.push(
      <Menu.Item key={i} active={active === i}  onClick={() => setActive(i)}  name={props.menuItems[i]} />
    );
  }

  return (
      <>
          <Header as="h1" textAlign='center'>
              <Header.Content className='strong'>
                  {props.name}
              </Header.Content>
          </Header>
          <Container>
              <Menu secondary>
                  {menu}
              </Menu>
              {props.pages[active]}

              <Message icon>
                  <Icon color="yellow" name="bitcoin" />
                  <Message.Content>
                      <Message.Header>If you like this free tool with no ads, help keep the lights on for this server anonymously.</Message.Header>
                      {process.env.REACT_APP_BITCOIN}
                  </Message.Content>
              </Message>
          </Container>
      </>
  );
}

ToolPage.defaultProps = {
    active: 0,
    endpoint: "/api/tools/poly-reg",

    pages: [],
    menuItems: [],
};
