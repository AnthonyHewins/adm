import React from 'react';
import {RouteComponentProps} from '@reach/router'

import Login from 'scenes/Login';
import Register from 'scenes/Register';
import AcctConfirmation from 'scenes/AcctConfirmation';
import PasswordRecovery from 'scenes/PasswordRecovery';
import ConfirmPasswordReset from 'scenes/ConfirmPasswordReset';

const acctConfirmation = ""
const RouteLogin = (p: RouteComponentProps) => <Login setLoggedIn={(currentLoginStatus: boolean) => {return;}} />
const RouteRegister = (p: RouteComponentProps) => <Register />
const RouteConfirmPasswordReset = (p: RouteComponentProps) => <ConfirmPasswordReset />
const RoutePasswordRecovery = (p: RouteComponentProps) => <PasswordRecovery />
const RouteAcctConfirmation = (p: RouteComponentProps) =>  <AcctConfirmation routerProps={routerProps} endpoint={acctConfirmation} />

const AuthRoutes = () => {
    return (
        <>
            <RouteAcctConfirmation path="/confirm/:token" />
            <RouteLogin path="/login"/>
            <RouteRegister path="/register"/>
            <RouteConfirmPasswordReset path="/confirm-password-reset"/>
            <RoutePasswordRecovery path="/reset-password"/>
        </>
    )
}

export default AuthRoutes;
