import React from 'react';
import { InlineMath } from 'react-katex';
import { Popup, Button, Message, Grid } from 'semantic-ui-react';

import { EnterData } from 'components/EnterData';
import { Graph } from 'components/Graph';
import { PolynomialKatex } from './PolynomialKatex';
import { AppError } from 'services/core';
import polyreg from 'services/tools/polyreg';
import { Matrix } from 'services/tools/matrix';

type PolynomialRegressionToolProps = {
  endpoint?: string;

  degree?: number;
  maxDeg?: number;
  decimalPlaces?: number;
  coefficient?: number[];
  data?: string[][];

  message?: React.ReactNode;
  graph?: React.ReactNode;
};

interface Regression {
  graph: React.ReactNode;
  coef: number[];
  err?: React.ReactNode;
}

const PolynomialRegressionTool: React.FC<PolynomialRegressionToolProps> = ({
  endpoint = '/api/tools/poly-reg',
  degree = 2,
  maxDeg = 5,
  decimalPlaces = 3,
  coefficient = [],
  data = undefined,
  message = undefined,
  graph = <Graph />,
}) => {
  const [deg, setDeg] = React.useState(degree);
  const [input, setInput] = React.useState(data);
  const [polyData, setPolyData] = React.useState({ graph: graph, coef: coefficient, err: message } as Regression);

  const onClick = (m: Matrix) => {
    if (m.length < 2) {
      setPolyData({
        err: (
          <Message negative>
            <Message.Header>Error:</Message.Header>
            Give at least 2 points for regression.
          </Message>
        ),
      } as Regression);
      return;
    } else if (m.dim !== 2) {
      setPolyData({
        err: (
          <Message negative>
            <Message.Header>Error:</Message.Header>
            Regression requires dimension 2 for this tool to work
          </Message>
        ),
      } as Regression);
      return;
    }

    const onSuccess = (coef: number[]) =>
      setPolyData({
        graph: (
          <Graph
            fn={(x: number) => {
              let y = 0;
              for (let j = 0; j < coef.length; j++) {
                if (coef[j] != null) y += coef[j] * Math.pow(x, j);
              }

              return y;
            }}
          />
        ),
        coef: coef,
      } as Regression);

    const onError = (error: AppError) => setPolyData({ err: error.toMessage() } as Regression);

    polyreg(m, deg, onSuccess, onError, decimalPlaces, endpoint);
  };

  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>{polyData.err}</Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column textAlign="center">
          <Button.Group>
            <Popup trigger={<Button>Polynomial degree: {deg}</Button>}>
              <p>
                Sets the degree of the polynomial that will fit your data points. E.g. <InlineMath>3</InlineMath> will
                fit your data to <InlineMath>{'ax^3+bx^2+cx+d'}</InlineMath>. <InlineMath>0</InlineMath> will attempt to
                fit to a constant, if you desire it.
              </p>
              <p>The max allowed is {maxDeg}.</p>
            </Popup>
            <Button disabled={deg >= maxDeg} icon="plus" onClick={() => setDeg(deg + 1)} />
            <Button disabled={deg <= 0} icon="minus" onClick={() => setDeg(deg - 1)} />
          </Button.Group>{' '}
          {polyData.graph || <Graph />}
          <PolynomialKatex coef={polyData.coef} />
        </Grid.Column>
        <Grid.Column>
          <EnterData data={input} action={onClick} maxDim={2} minDim={2} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PolynomialRegressionTool;
