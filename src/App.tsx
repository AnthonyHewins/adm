import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {fetchJwt} from './api/user/jwt'

import {Home}             from './views/Home';
import {MenuBar}          from './views/MenuBar';
import {Footer}           from './views/Footer';
import {Contact}          from './views/contact/Contact';
import {Anthony}          from './views/contact/Anthony';

import {Fund}             from './views/fund/Fund'

import {Login}            from './views/auth/Login';
import {Register}         from './views/auth/Register';
import {AcctConfirmation} from './views/auth/AcctConfirmation'

import {Tools}            from './views/tools/Tools';
import {ToolPage}         from './views/tools/ToolPage';
import {PolynomialRegressionTool}  from './views/tools/poly-reg/PolynomialRegressionTool';
import {PolynomialRegressionApi}   from './views/tools/poly-reg/PolynomialRegressionApi';
import {PolynomialRegressionAbout} from './views/tools/poly-reg/PolynomialRegressionAbout';

import {FeatureEngineeringTool}  from './views/tools/feature-engineering/FeatureEngineeringTool';
import {FeatureEngineeringApi}   from './views/tools/feature-engineering/FeatureEngineeringApi';
import {FeatureEngineeringAbout} from './views/tools/feature-engineering/FeatureEngineeringAbout';

import './fonts/slimjoe.otf';
import './App.css';
import { PasswordRecovery } from './views/auth/PasswordRecovery';

export interface AppProps {
    appName: string,
    apiBase: string,

    polyReg:            string,
    featureEngineering: string,
    registration:       string,
    acctConfirmation:   string,
    login:              string,
    refreshToken:       string,
}

export function App(props: AppProps) {
    const appendApiBase = (s: string): string => {
        return props.apiBase + s
    }

    const polyreg            = appendApiBase(props.polyReg)
    const featureEngineering = appendApiBase(props.featureEngineering)
    const registration       = appendApiBase(props.registration)
    const acctConfirmation   = appendApiBase(props.acctConfirmation)
    const login              = appendApiBase(props.login)

    const [loggedIn, setLoggedIn] = React.useState(fetchJwt(props.refreshToken) !== null)

    return <Router>
        <MenuBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

        <Switch>
            <Route path="/confirm/:token"
                   render={(routerProps) => <AcctConfirmation routerProps={routerProps} endpoint={acctConfirmation} />}
            />
            <Route path="/tools/feature-engineering">
                <ToolPage name="Feature Engineering"
                          menuItems={["Tool", "API", "How it works"]}
                          pages={[
                              <FeatureEngineeringTool  endpoint={featureEngineering}/>,
                              <FeatureEngineeringApi   endpoint={featureEngineering}/>,
                              <FeatureEngineeringAbout endpoint={featureEngineering}/>
                          ]}/>
            </Route>
            <Route path="/tools/poly-reg">
                <ToolPage name="Polynomial Regression"
                          menuItems={["Tool", "API", "How it works"]}
                          pages={[
                              <PolynomialRegressionTool  endpoint={polyreg}/>,
                              <PolynomialRegressionApi   endpoint={polyreg}/>,
                              <PolynomialRegressionAbout endpoint={polyreg}/>
                          ]}/>
            </Route>
            <Route path="/contact/anthony">
                <Anthony />
            </Route>
            <Route path="/contact">
                <Contact />
            </Route>
            <Route path="/fund">
                <Fund />
            </Route>
            <Route path="/login">
                <Login endpoint={login} setLoggedIn={setLoggedIn} />
            </Route>
            <Route path="/register">
                <Register endpoint={registration} />
            </Route>
            <Route path="/tools">
                <Tools />
            </Route>
            <Route path="/reset-password">
                <PasswordRecovery endpoint="/api/v1/auth/reset_password" />
            </Route>
            <Route exact path="/">
                <Home appName={props.appName} />
            </Route>
        </Switch>

        <Footer/>
    </Router>;
}
