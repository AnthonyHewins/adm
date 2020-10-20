import React from 'react';

import Home from 'scenes/Home';
import Contact from 'scenes/Contact';
import Anthony from 'scenes/Anthony';

import {Router} from '@reach/router';

import Fund from 'scenes/fund/Fund';

import ToolRoutes from 'routes/ToolRoutes';
import AuthRoutes from 'routes/AuthRoutes';

const HomeRoute = (p: any) => <Home />
const ContactCEO = (p: any) => <Anthony />
const GeneralContact = (p: any) => <Contact />

const RouterSwitch: React.FC = () => {
    return (
        <Router>
            <HomeRoute path='/'>
                <GeneralContact path='contact'>
                    <ContactCEO path='anthony'/>
                </GeneralContact>
                <ToolRoutes path='tools'/>
                <AuthRoutes path='auth'/>
            </HomeRoute>
        </Router>
    )
}

export default RouterSwitch
