import React from 'react';
import {Header, Container} from 'semantic-ui-react';
import {Home} from './Home';
import {MenuBar} from './MenuBar';
import {Footer} from './Footer';
import {Tools} from './Tools';
import {PolynomialRegression} from './tools/PolynomialRegression';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './fonts/slimjoe.otf';
import './App.css';

function App() {
  return <Router>
           <MenuBar loggedin={false} />

           <Switch>
             <Route path="/tools/poly-reg">
               <PolynomialRegression />
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

export default App;
