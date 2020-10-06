import React from 'react';
import {Menu} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export interface MenuProps {
    loggedIn?: boolean;
    setLoggedIn?: (loginStatus: boolean) => void;
}

export function MenuBar({loggedIn = false, setLoggedIn = (_: boolean) => null}: MenuProps) {
    let loginComponent: React.ReactNode
    if (loggedIn) {
        loginComponent = <>
            <Menu.Item exact
                       as={NavLink}
                       to="/fund"
                       name="Fund"
                       className="slimjoe" />
            <Menu.Item name="Logout"
                       className="slimjoe"
                       onClick={() => {
                           sessionStorage.removeItem("jwt-token")
                           sessionStorage.removeItem("jwt-expiration")
                           setLoggedIn(false)
                       }} />
        </>
    } else {
        loginComponent = <>
            <Menu.Item as={NavLink}
                       to="/register"
                       name="Register"
                       className="slimjoe" />
            <Menu.Item as={NavLink}
                       to="/login"
                       name="Login"
                       className="slimjoe" />
        </>
    }

    return (
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
                {loginComponent}
            </Menu.Menu>
        </Menu>
    );
}
