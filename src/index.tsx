import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

const appName            = process.env.REACT_APP_APP_NAME            || "Artifex de machina"

const apiBase            = process.env.REACT_APP_API_BASE            || "/api/v1"

const polyReg            = process.env.REACT_APP_POLYREG             || "/poly-reg"
const featureEngineering = process.env.REACT_APP_FEATURE_ENGINEERING || "/feature-engineering"
const registration       = process.env.REACT_APP_REGISTRATION        || "/registration"
const acctConfirmation   = process.env.REACT_APP_ACCT_CONFIRMATION   || "/registration/confirmation"
const login              = process.env.REACT_APP_LOGIN               || "/login"
const refreshToken       = process.env.REACT_APP_REFRESH_TOKEN       || "/confirm-acct"

const resetPassword      = process.env.REACT_APP_PASSWORD_RESET      || "/reset-password"
const confirmReset       = process.env.REACT_APP_CONFIRM_RESET       || "/confirm-password-reset"

const app = <App appName={appName}
                 apiBase={apiBase}
                 polyReg={polyReg}
                 refreshToken={refreshToken}
                 featureEngineering={featureEngineering}
                 registration={registration}
                 resetPassword={resetPassword}
                 confirmReset={confirmReset}
                 acctConfirmation={acctConfirmation}
                 login={login} />

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
