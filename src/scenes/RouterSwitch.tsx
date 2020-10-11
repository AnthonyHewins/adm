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

import Tools from './tools/Tools';
import ToolPage from '../components/tools/ToolPage';
import PolynomialRegressionTool from './tools/poly-reg/PolynomialRegressionTool';
import PolynomialRegressionApi from './tools/poly-reg/PolynomialRegressionApi';
import PolynomialRegressionAbout from './tools/poly-reg/PolynomialRegressionAbout';

import FeatureEngineeringTool from './tools/feature-engineering/FeatureEngineeringTool';
import FeatureEngineeringApi from './tools/feature-engineering/FeatureEngineeringApi';
import FeatureEngineeringAbout from './tools/feature-engineering/FeatureEngineeringAbout';

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
        <Route path="/tools/feature-engineering">
          <ToolPage
            name="Feature Engineering"
            menuItems={['Tool', 'API', 'How it works']}
            pages={[
              <FeatureEngineeringTool key="tool" />,
              <FeatureEngineeringApi key="api" />,
              <FeatureEngineeringAbout key="about" />,
            ]}
          />
        </Route>
        <Route path="/tools/poly-reg">
          <ToolPage
            name="Polynomial Regression"
            menuItems={['Tool', 'API', 'How it works']}
            pages={[
              <PolynomialRegressionTool key="tool" />,
              <PolynomialRegressionApi key="api" />,
              <PolynomialRegressionAbout key="about" />,
            ]}
          />
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
          <Login setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/tools">
          <Tools />
        </Route>
        <Route path="/confirm-password-reset">
          <ConfirmPasswordReset />
        </Route>
        <Route path="/reset-password">
          <PasswordRecovery />
        </Route>
        <Route exact path="/">
          <Home appName={process.env.APP_NAME} />
        </Route>
      </Switch>
    )
}

export default RouterSwitch
