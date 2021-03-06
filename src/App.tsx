import React from 'react';

import MenuBar from 'scenes/MenuBar';
import Footer from 'scenes/Footer';
import RouterSwitch from 'routes/RouterSwitch'

import 'App.css';

type AppProps = {
    refreshToken?: string
}

const App: React.FC<AppProps> = ({refreshToken}) => {
    const [loggedIn, setLoggedIn] = React.useState(null);

    return (
        <>
            <MenuBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <RouterSwitch />
            <Footer />
        </>
    );
}

export default App;
