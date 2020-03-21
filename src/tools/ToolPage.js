import React from 'react';
import {Container, Menu} from 'semantic-ui-react';
import {StrongHeader} from '../StrongHeader';

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
      <div style={{marginTop: 40, marginBottom: 40}}>
        <StrongHeader>
          {props.name}
        </StrongHeader>
      </div>
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
