import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '@reach/router';

export interface MenuProps {
  loggedIn?: boolean;
  setLoggedIn?: (loginStatus: boolean) => void;
}

const MenuBar: React.FC<MenuProps> = ({ loggedIn = false, setLoggedIn = (_: boolean) => null }) => {
  let loginComponent: React.ReactNode;
  if (loggedIn) {
    loginComponent = (
      <>
        <Menu.Item exact as={Link} to="/fund" name="Fund" className="slimjoe" />
        <Menu.Item
          name="Logout"
          className="slimjoe"
          onClick={() => {
            sessionStorage.removeItem('jwt-token');
            sessionStorage.removeItem('jwt-expiration');
            setLoggedIn(false);
          }}
        />
      </>
    );
  } else {
    loginComponent = (
      <>
        <Menu.Item as={Link} to="/register" name="Register" className="slimjoe" />
        <Menu.Item as={Link} to="/login" name="Login" className="slimjoe" />
      </>
    );
  }

  return (
    <Menu pointing secondary>
      <Menu.Item exact as={Link} to="/" name="&Lambda;" className="lambda" />
      <Menu.Item as={Link} to="/tools" name="tools" className="slimjoe" />
      <Menu.Item as={Link} to="/contact" name="contact" className="slimjoe" />
      <Menu.Menu position="right">{loginComponent}</Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
