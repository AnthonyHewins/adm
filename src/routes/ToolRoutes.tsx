import React from 'react'
import { RouteComponentProps } from '@reach/router';

import Tools from 'scenes/tools/Tools';
import ToolPage from 'components/tools/ToolPage';
import PolynomialRegressionTool from 'scenes/tools/poly-reg/PolynomialRegressionTool';
import PolynomialRegressionApi from 'scenes/tools/poly-reg/PolynomialRegressionApi';
import PolynomialRegressionAbout from 'scenes/tools/poly-reg/PolynomialRegressionAbout';

import FeatureEngineeringTool from 'scenes/tools/feature-engineering/FeatureEngineeringTool';
import FeatureEngineeringApi from 'scenes/tools/feature-engineering/FeatureEngineeringApi';
import FeatureEngineeringAbout from 'scenes/tools/feature-engineering/FeatureEngineeringAbout';

const FeatureEngineeringRoute = (props: RouteComponentProps) => (
    <ToolPage
        name="Feature Engineering"
        menuItems={['Tool', 'API', 'How it works']}
        pages={[
            <FeatureEngineeringTool key="tool" />,
            <FeatureEngineeringApi key="api" />,
            <FeatureEngineeringAbout key="about" />,
        ]}
    />
)

const PolynomialRegressionRoute = (props: RouteComponentProps) => (
    <ToolPage
        name="Polynomial Regression"
        menuItems={['Tool', 'API', 'How it works']}
        pages={[
            <PolynomialRegressionTool key="tool" />,
            <PolynomialRegressionApi key="api" />,
            <PolynomialRegressionAbout key="about" />,
        ]}
    />
)

const ToolsIndex = (props: any) => <Tools />

const ToolRoutes = (p: RouteComponentProps) => {
    return (
        <>
            <ToolsIndex path='/' default />
            <FeatureEngineeringRoute path="feature-engineering"/>
            <PolynomialRegressionRoute path="poly-reg"/>
        </>
    )
}

export default ToolRoutes
