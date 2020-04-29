import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './App';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './serviceWorker';

const appName:            string = process.env.REACT_APP_APP_NAME            || "Artifex de machina"
const apiBase:            string = process.env.REACT_APP_API_BASE            || "/api/v1"
const polyReg:            string = process.env.REACT_APP_POLYREG             || "/poly-reg"
const featureEngineering: string = process.env.REACT_APP_FEATURE_ENGINEERING || "/feature-engineering"
const registration:       string = process.env.REACT_APP_REGISTRATION        || "/registration"
const acctConfirmation:   string = process.env.REACT_APP_ACCT_CONFIRMATION   || "/registration/confirmation"
const login:              string = process.env.REACT_APP_LOGIN               || "/auth"

const app = <App appName={appName}
                 apiBase={apiBase}
                 polyReg={polyReg}
                 featureEngineering={featureEngineering}
                 registration={registration}
                 acctConfirmation={acctConfirmation}
                 login={login} />

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
