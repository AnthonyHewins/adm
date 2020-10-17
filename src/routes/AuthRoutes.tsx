import React from 'react';
import {RouteComponentProps} from '@reach/router'

import Login from 'scenes/auth/Login';
import Register from 'scenes/auth/Register';
import AcctConfirmation from 'scenes/auth/AcctConfirmation';
import PasswordRecovery from 'scenes/auth/PasswordRecovery';
import ConfirmPasswordReset from 'scenes/auth/ConfirmPasswordReset';

const acctConfirmation = ""
const RouteLogin = (p: RouteComponentProps) => <Login setLoggedIn={(currentLoginStatus: boolean) => {return;}} />
const RouteRegister = (p: RouteComponentProps) => <Register />
const RouteConfirmPasswordReset = (p: RouteComponentProps) => <ConfirmPasswordReset />
const RoutePasswordRecovery = (p: RouteComponentProps) => <PasswordRecovery />
const RouteAcctConfirmation = (p: RouteComponentProps) =>  <AcctConfirmation endpoint={acctConfirmation} />

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
