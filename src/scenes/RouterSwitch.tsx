import React from 'react';

import Home from './Home';
import Contact from './Contact';
import Anthony from './Anthony';

import {Router, RouteComponentProps, Link } from '@reach/router';

import Fund from './fund/Fund';

import ToolRoutes from './tools/ToolRoutes';
import AuthRoutes from './auth/AuthRoutes';

const ContactCEO = (p: RouteComponentProps) => <Anthony />
const GeneralContact = (p: RouteComponentProps) => <Contact />

const RouterSwitch: React.FC = () => {
    return (
        <>
            <ContactCEO path='/contact/anthony'/>
            <GeneralContact path='/contact'/>
            <ToolRoutes/>
            <AuthRoutes/>
            <Home path='/'/>
        </>
    )
}

export default RouterSwitch