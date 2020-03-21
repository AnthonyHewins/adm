import React from 'react';
import {Header, Container} from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Home} from './Home';
import {MenuBar} from './MenuBar';
import {Footer} from './Footer';
import {Tools} from './Tools';
import {ToolPage} from './tools/ToolPage';

import {PolynomialRegressionTool} from './tools/poly-reg/PolynomialRegressionTool';
import {PolynomialRegressionApi} from './tools/poly-reg/PolynomialRegressionApi';
import {PolynomialRegressionAbout} from './tools/poly-reg/PolynomialRegressionAbout';

import {FeatureEngineeringTool} from './tools/feature-engineering/FeatureEngineeringTool';
import {FeatureEngineeringApi} from './tools/feature-engineering/FeatureEngineeringApi';
import {FeatureEngineeringAbout} from './tools/feature-engineering/FeatureEngineeringAbout';

import './fonts/slimjoe.otf';
import './App.css';

export default function App(props) {
  return <Router>
           <MenuBar loggedin={false} />

           <Switch>
             <Route path="/tools/feature-engineering">
               <ToolPage name="Feature Engineering"
                         menuItems={["Tool", "API", "How it works"]}
                         pages={[
                             <FeatureEngineeringTool  endpoint={props.featureEngineeringEndpoint}/>,
                             <FeatureEngineeringApi   endpoint={props.featureEngineeringEndpoint}/>,
                             <FeatureEngineeringAbout endpoint={props.featureEngineeringEndpoint}/>
                         ]}/>
             </Route>
             <Route path="/tools/poly-reg">
               <ToolPage name="Polynomial Regression"
                         menuItems={["Tool", "API", "How it works"]}
                         pages={[
                             <PolynomialRegressionTool  endpoint={props.polyregEndpoint}/>,
                             <PolynomialRegressionApi   endpoint={props.polyregEndpoint}/>,
                             <PolynomialRegressionAbout endpoint={props.polyregEndpoint}/>
                         ]}/>
             </Route>
             <Route path="/tools">
               <Tools />
             </Route>
             <Route path="/">
               <Home />
             </Route>
           </Switch>

           <Footer/>
         </Router>;
}

App.defaultProps = {
    polyregEndpoint: "/api/tools/poly-reg",
    featureEngineeringEndpoint: "/api/tools/feature-engineering",
};
