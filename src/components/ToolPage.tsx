import React from 'react';
import { Header, Container, Menu } from 'semantic-ui-react';
import Donation from '../Donation';

export type ToolPageProps = {
  name: string;
  active?: number;
  pages: React.ReactNode[];
  menuItems: string[];
};

const ToolPage = ({ active = 0, name, pages, menuItems }: ToolPageProps) => {
  const [currentActive, setCurrentActive] = React.useState<number>(active);

  const menu = [];
  for (let i = 0; i < pages.length; i++) {
    menu.push(
      <Menu.Item key={i} active={currentActive === i} onClick={() => setCurrentActive(i)} name={menuItems[i]} />,
    );
  }

  return (
    <Container>
      <Header as="h1" textAlign="center">
        <Header.Content className="strong">{name}</Header.Content>
      </Header>
      <Menu secondary>{menu}</Menu>
      {pages[currentActive]}

      <Donation />
    </Container>
  );
};

export default ToolPage;
