import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export const PolynomialRegressionAbout = props => {
    const X = `\\textbf{X}`;
    const x = `\\vec{x}`;
    const y = `\\vec{y}`;
    const theta = "\\theta";
    const i = <InlineMath>{"i"}</InlineMath>;
    const j = <InlineMath>{"j"}</InlineMath>;

    return (
        <>
          <p>
            Before reading this, make sure you at least understand what minimization and optimization objectives are.
          </p>

          <p>
            Polynomial regression tries to model a dependent variable using a polynomial, rather than normal linear regression.
            So you're looking for parameter <InlineMath>{theta}</InlineMath> such that
            <InlineMath>{`${theta}_0+${theta}_1x+\\cdots+${theta}_mx^m`}</InlineMath>.
          </p>

          <p>
            Given a pair of vectors <InlineMath>{x}</InlineMath> and <InlineMath>{y}</InlineMath>{" "}
            denoting observations, both of equal length <InlineMath>{"n"}</InlineMath>, we want to find a polynomial{" "}
            (with a set degree <InlineMath>{"m"}</InlineMath>) that gets as close as possible to each observation. We{" "}
            don't concern ourselves with <a href="https://en.wikipedia.org/wiki/Regularization_(mathematics)">regularization</a>.
          </p>

          <p>
            The beginning is first taking <InlineMath>{x}</InlineMath> and transforming it into an <InlineMath>{"n \\times m"}</InlineMath>{" "}
            matrix. Each cell in the matrix takes a value of <InlineMath>{"x_i^j"}</InlineMath>, meaning {i} is the{" "} {i}th observation{" "}
            to the {j}th power. Here's what happens if{" "}
            <InlineMath>{x}</InlineMath> is <InlineMath>{`\\langle1, ..., 10\\rangle`}</InlineMath> and <InlineMath>{"m=4"}</InlineMath>:
          </p>

          <BlockMath>
            {`A_{n,m} =
            \\begin{bmatrix}
                1    &    1     &   1     & \\cdots &    1    \\\\
                1    &    2     &   4     & \\cdots &   16    \\\\
            \\vdots  & \\vdots  & \\vdots & \\ddots & \\vdots \\\\
                1    &   10     &   100   & \\cdots &  10,000
            \\end{bmatrix}`}
          </BlockMath>

          <p>
            This matrix is called the <a href="https://en.wikipedia.org/wiki/Vandermonde_matrix">Vandermonde matrix</a>.
          </p>

          <p>
            Rigorously, we have a pair <InlineMath>{`(\\mathbb{R}^{n,m}, \\mathbb{R})`}</InlineMath> that has to produce some polynomial
            <InlineMath>{`p(x) \\in \\mathbb{R}[X]`}</InlineMath> that is as close as possible to the observations as possible. The most typical way
            of accomplishing this is squared error.
          </p>

          <p>
            If <InlineMath>{theta}</InlineMath> is our parameter list, with <InlineMath>{X}</InlineMath> being the Vandermonde matrix
            and <InlineMath>{y}</InlineMath> being the dependent variable, we want to solve <InlineMath>{`||${y}-${X}${theta}||^2`}</InlineMath>.
            This is the vectorized implementation, but you can do it iteratively.
          </p>

          <p>
            Without going through the proof, the analytical solution is given as
          </p>

          <BlockMath>
            {`${theta}=(${X}^T${X})^{-1}${X}^T${y}`}
          </BlockMath>

          <p>
            Since an inverse is taking place in this solution you can draw a few conclusions: first, this is somewhat expensive to calculate, second,
            it may not exist if the inverse of the Gramian (<InlineMath>{`${X}^T${X}`}</InlineMath>) does not exist. However it's important to remember
            we're dealing
            with the Vandermonde matrix, so it's guaranteed to be linearly independent as long as we have more rows than columns (obviously) and that
            no two observations take on the same value. This should make some intuitive sense; we are trying to find a polynomial and polynomials are
            functions. Now this may not make sense in many areas of machine learning, since you can fix a variable in an experiment and measure something
            twice getting different values.
          </p>

          <p>
            As an aside, using the normal equation can actually do more than just give back a solution with a polynomial; you can come up with nearly any
            function you can think of. If you want to use something sinusoidal, include <InlineMath>{"e"}</InlineMath> or do something else complex, you
            can accomplish that easily; just seed <InlineMath>{X}</InlineMath> properly.
          </p>
          <p>
            More details on <a href="https://en.wikipedia.org/wiki/Polynomial_regression">Wikipedia</a>.
          </p>
        </>
    );
};
