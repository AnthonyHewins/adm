import React from 'react'
import {Route} from 'react-router-dom';

import Tools from 'scenes/Tools';
import ToolPage from 'components/tools/ToolPage';
import PolynomialRegressionTool from 'scenes/poly-reg/PolynomialRegressionTool';
import PolynomialRegressionApi from 'scenes/poly-reg/PolynomialRegressionApi';
import PolynomialRegressionAbout from 'scenes/poly-reg/PolynomialRegressionAbout';

import FeatureEngineeringTool from 'scenes/feature-engineering/FeatureEngineeringTool';
import FeatureEngineeringApi from 'scenes/feature-engineering/FeatureEngineeringApi';
import FeatureEngineeringAbout from 'scenes/feature-engineering/FeatureEngineeringAbout';

const ToolRoutes = () => {
    return (
       <>
        <Route path="/tools/feature-engineering">
          <ToolPage
            name="Feature Engineering"
            menuItems={['Tool', 'API', 'How it works']}
            pages={[
              <FeatureEngineeringTool key="tool" />,
              <FeatureEngineeringApi key="api" />,
              <FeatureEngineeringAbout key="about" />,
            ]}
          />
        </Route>
        <Route path="/tools/poly-reg">
          <ToolPage
            name="Polynomial Regression"
            menuItems={['Tool', 'API', 'How it works']}
            pages={[
              <PolynomialRegressionTool key="tool" />,
              <PolynomialRegressionApi key="api" />,
              <PolynomialRegressionAbout key="about" />,
            ]}
          />
        </Route>
        <Route path="/tools">
          <Tools />
        </Route>
       </>
    )
}

export default ToolRoutes
