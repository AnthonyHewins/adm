import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import fetchJwt from './api/user/jwt';

import MenuBar from './scenes/MenuBar';
import Footer from './scenes/Footer';
import RouterSwitch from './routes/RouterSwitch'

import './App.css';

type AppProps = {
  refreshToken?: string
}

const App: React.FC<AppProps> = ({refreshToken}) => {
  const [loggedIn, setLoggedIn] = React.useState(fetchJwt(refreshToken) !== null);

  return (
    <Router>
      <MenuBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <RouterSwitch />
      <Footer />
    </Router>
  );
}

export default App;
