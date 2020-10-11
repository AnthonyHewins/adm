import React from 'react';

import Home from 'scenes/Home';
import Contact from 'scenes/Contact';
import Anthony from 'scenes/Anthony';

import {Router, RouteComponentProps, Link } from '@reach/router';

import Fund from './fund/Fund';

import ToolRoutes from 'routes/ToolRoutes';
import AuthRoutes from 'routes/AuthRoutes';

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
