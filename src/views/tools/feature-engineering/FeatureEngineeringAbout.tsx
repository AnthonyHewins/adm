import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export const FeatureEngineeringAbout = props => {
    return (
        <p>
          This endpoint performs feature scaling. It takes a matrix:

          <BlockMath>
            {`\\begin{bmatrix}
                1    &    2     &   3 \\\\
                4    &    5     &   6 \\\\
                7    &    8     &   9
            \\end{bmatrix}`}
          </BlockMath>

          And performs feature scaling column-wise, treating each column as a dimension.{" "}
          Take the Z-score for example on the above matrix:

          <BlockMath>
            {`\\begin{bmatrix}
               -1    &   -1   &  -1 \\\\
                0    &    0   &   0 \\\\
                1    &    1   &   1
            \\end{bmatrix}`}
          </BlockMath>

          <p>
            Formulas:
          </p>

          <BlockMath>
            {"Z score = \\frac{x - \\overline{x}}{\\sigma}"}
          </BlockMath>

          <BlockMath>
            {"Normalization = \\frac{x - \\overline{x}}{max(x)-min(x)}"}
          </BlockMath>

          <p>
            <InlineMath>{"\\overline{x} :="}</InlineMath> sample mean
          </p>

          <a href="https://en.wikipedia.org/wiki/Feature_scaling">More information</a>
        </p>
    );
};

FeatureEngineeringAbout.defaultProps = {
    endpoint: "/api/tools/feature-engineering"
};
