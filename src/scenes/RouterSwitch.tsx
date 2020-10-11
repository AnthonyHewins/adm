import React from 'react';

import Home from './Home';
import Contact from './Contact';
import Anthony from './Anthony';

import {Switch, Route} from 'react-router-dom';

import Fund from './fund/Fund';

import Login from './auth/Login';
import Register from './auth/Register';
import AcctConfirmation from './auth/AcctConfirmation';
import PasswordRecovery from './auth/PasswordRecovery';
import ConfirmPasswordReset from './auth/ConfirmPasswordReset';

import ToolRoutes from './tools/ToolRoutes';

const acctConfirmation = ""
const featureEngineering = ""
const polyreg = ""
const login = ""
const registration = ""
const confirmReset = ""
const resetPassword = ""

const RouterSwitch: React.FC = () => {
  const setLoggedIn = (x: any): void => null

    return (
      <Switch>
        <Route
          path="/confirm/:token"
          render={(routerProps) => <AcctConfirmation routerProps={routerProps} endpoint={acctConfirmation} />}
        />
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
          <Login setLoggedIn={setLoggedIn} />
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
        <ToolRoutes/>
        <Route exact path="/">
          <Home appName={process.env.APP_NAME} />
        </Route>
      </Switch>
    )
}

export default RouterSwitch
