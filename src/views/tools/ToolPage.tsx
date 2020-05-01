import React from 'react';
import {Header, Container, Menu} from 'semantic-ui-react';

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
