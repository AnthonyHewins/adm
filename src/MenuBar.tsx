import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dropdown, Modal, Menu} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export const MENU_STATES = Object.freeze({
    HOME: 0,
    CONTACT: 1,
    TOOLS: 2,
});

const LoginModal = (props) => {
    return (
        <Modal size='small' open={props.open} onClose={props.setOpen(false)}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>
    );
};

export function MenuBar(props) {
    const [open, setOpen] = React.useState(false);

    let auth;
    if (props.loggedIn) {
        auth = <Dropdown.Item text='Logout'
                              onClick={() => null} />;//clearLogin} />;
    } else {
        auth = <Dropdown.Item text='Login'
                              onClick={() => setOpen(true)} />;
    }
   
    return (
      <>
          {open && <LoginModal />}
        <Menu pointing secondary>
          <Menu.Item exact
                     as={NavLink}
                     to='/'
                     name='&Lambda;'
                     className='lambda' />
          <Menu.Item as={NavLink}
                     to='/tools'
                     name='tools'
                     className='slimjoe' />
          <Menu.Item as={NavLink}
                     to='/contact'
                     name='contact'
                     className='slimjoe' />
          <Menu.Menu position='right'>
            <Menu.Item as={NavLink}
                       to="/login"
                       name="Login"
                       className="slimjoe" />
            <Menu.Item as={NavLink}
                       to="/register"
                       name="Register"
                       className="slimjoe" />
          </Menu.Menu>
        </Menu>
      </>
    );
}

MenuBar.propTypes = {
    loggedIn: PropTypes.bool,
};

MenuBar.defaultProps = {
    loggedIn: false,
};
