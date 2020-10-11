import React from 'react';
import {Route} from 'react-router-dom'

import Login from './Login';
import Register from './Register';
import AcctConfirmation from './AcctConfirmation';
import PasswordRecovery from './PasswordRecovery';
import ConfirmPasswordReset from './ConfirmPasswordReset';

const acctConfirmation = ""
const AuthRoutes = () => {
    return (
        <>
            <Route
                path="/confirm/:token"
                render={(routerProps) => <AcctConfirmation routerProps={routerProps} endpoint={acctConfirmation} />}
            />
            <Route path="/login">
                <Login setLoggedIn={(currentLoginStatus: boolean) => {return;}} />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/confirm-password-reset">
                <ConfirmPasswordReset />
            </Route>
            <Route path="/reset-password">
                <PasswordRecovery />
            </Route>
        </>
    )
}

export default AuthRoutes;
