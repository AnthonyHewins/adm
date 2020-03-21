import React from 'react';
import PropTypes from 'prop-types';
import {Menu} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export const MENU_STATES = Object.freeze({
  HOME: 0,
  CONTACT: 1,
  TOOLS: 2,
});

export function MenuBar(props) {
  return (
    <Menu pointing secondary>

      <Menu.Item exact
                 as={NavLink}
                 to='/'
                 name='home'
                 className='slimjoe' />
      <Menu.Item as={NavLink}
                 to='/tools'
                 name='tools'
                 className='slimjoe' />
      <Menu.Item exact
                 as={NavLink}
                 to='/contact'
                 name='contact'
                 className='slimjoe' />

      <Menu.Menu position='right'>
        <Menu.Item className='slimjoe'
                   name={props.loggedin ? 'logout' : 'login'} />
      </Menu.Menu>

    </Menu>
  );
}

MenuBar.propTypes = {
  loggedin: PropTypes.bool,
};

MenuBar.defaultProps = {
  loggedin: false,
};
