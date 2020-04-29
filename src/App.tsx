import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {Home}     from './Home';
import {MenuBar}  from './MenuBar';
import {Footer}   from './Footer';
import {Tools}    from './Tools';
import {Contact}  from './Contact';
import {Anthony}  from './contact/Anthony';
import {Login}    from './login/Login';
import {Register} from './login/Register';
import {ToolPage} from './tools/ToolPage';

import {PolynomialRegressionTool}  from './tools/poly-reg/PolynomialRegressionTool';
import {PolynomialRegressionApi}   from './tools/poly-reg/PolynomialRegressionApi';
import {PolynomialRegressionAbout} from './tools/poly-reg/PolynomialRegressionAbout';

import {FeatureEngineeringTool}  from './tools/feature-engineering/FeatureEngineeringTool';
import {FeatureEngineeringApi}   from './tools/feature-engineering/FeatureEngineeringApi';
import {FeatureEngineeringAbout} from './tools/feature-engineering/FeatureEngineeringAbout';

import './fonts/slimjoe.otf';
import './App.css';

export interface AppProps {
    appName: string,
    apiBase: string,

    polyReg:            string,
    featureEngineering: string,
    registration:       string,
    acctConfirmation:   string,
    login:              string,
}

export function App(props: AppProps) {
    const appendApiBase = (s: string): string => {
        return props.apiBase + s
    }

    const polyreg            = appendApiBase(props.polyReg)
    const featureEngineering = appendApiBase(props.featureEngineering)
    const registration       = appendApiBase(props.registration)
    const acctConfirmation   = appendApiBase(props.acctConfirmation)
    const login              = appendApiBase(props.acctConfirmation)

    return <Router>
        <MenuBar loggedIn={false} />

        <Switch>
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
            <Route path="/acct-confirmation">
                {/* TODO */}
                asldp
            </Route>
            <Route path="/login">
                <Login endpoint={login} />
            </Route>
            <Route path="/register">
                <Register endpoint={registration} />
            </Route>
            <Route path="/tools">
                <Tools />
            </Route>
            <Route path="/">
                <Home appName={props.appName} />
            </Route>
        </Switch>

        <Footer/>
    </Router>;
}

App.defaultProps = {
    // Meta
    appName: "Artifex de machina",
    apiBase: "/api/v1",

    // Routes
    polyreg: "/poly-reg",
    featureEngineering: "/feature-engineering",

    registration: "/registration",
    acctConfirmation: "/registration/confirmation",
    login: "/login",
};
