import React from 'react';

import Home from 'scenes/Home';
import Contact from 'scenes/Contact';
import Anthony from 'scenes/Anthony';

import {Router, RouteComponentProps, Link } from '@reach/router';

import Fund from 'scenes/fund/Fund';

import ToolRoutes from 'routes/ToolRoutes';
import AuthRoutes from 'routes/AuthRoutes';

const HomeRoute = (p: RouteComponentProps) => <Home />
const ContactCEO = (p: RouteComponentProps) => <Anthony />
const GeneralContact = (p: RouteComponentProps) => <Contact />

const RouterSwitch: React.FC = () => {
    return (
        <>
            <ContactCEO path='/contact/anthony'/>
            <GeneralContact path='/contact'/>
            <ToolRoutes />
            <AuthRoutes />
            <HomeRoute path='/'/>
        </>
    )
}

export default RouterSwitch
