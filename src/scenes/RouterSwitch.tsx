import React from 'react';

import Home from './Home';
import Contact from './Contact';
import Anthony from './Anthony';

import {Switch, Route} from 'react-router-dom';

import Fund from './fund/Fund';

import ToolRoutes from './tools/ToolRoutes';
import AuthRoutes from './auth/AuthRoutes';

const RouterSwitch: React.FC = () => {
    return (
      <Switch>
        <Route path="/contact/anthony">
          <Anthony />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/fund">
          <Fund />
        </Route>
        <ToolRoutes/>
        <AuthRoutes/>
        <Route exact path="/">
          <Home appName={process.env.APP_NAME} />
        </Route>
      </Switch>
    )
}

export default RouterSwitch
