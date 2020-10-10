import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import fetchJwt from './api/user/jwt';

import MenuBar from './scenes/MenuBar';
import Footer from './scenes/Footer';
import RouterSwitch from './scenes/RouterSwitch'

import './App.css';

const App: React.FC = (props) => {
  const [loggedIn, setLoggedIn] = React.useState(fetchJwt(props.refreshToken) !== null);

  return (
    <Router>
      <MenuBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <RouterSwitch />
      <Footer />
    </Router>
  );
}

export default App;
