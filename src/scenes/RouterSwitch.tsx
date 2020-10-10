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
              <FeatureEngineeringTool key="tool" endpoint={featureEngineering} />,
              <FeatureEngineeringApi key="api" endpoint={featureEngineering} />,
              <FeatureEngineeringAbout key="about" />,
            ]}
          />
        </Route>
        <Route path="/tools/poly-reg">
          <ToolPage
            name="Polynomial Regression"
            menuItems={['Tool', 'API', 'How it works']}
            pages={[
              <PolynomialRegressionTool key="tool" endpoint={polyreg} />,
              <PolynomialRegressionApi key="api" endpoint={polyreg} />,
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
          <Login endpoint={login} setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/register">
          <Register endpoint={registration} />
        </Route>
        <Route path="/tools">
          <Tools />
        </Route>
        <Route path="/confirm-password-reset">
          <ConfirmPasswordReset endpoint={confirmReset} />
        </Route>
        <Route path="/reset-password">
          <PasswordRecovery endpoint={resetPassword} />
        </Route>
        <Route exact path="/">
          <Home appName={process.env.APP_NAME} />
        </Route>
      </Switch>
    )
}

export default RouterSwitch
