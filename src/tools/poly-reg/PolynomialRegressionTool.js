import React from 'react';
import {Menu, Popup, Button, Loader, Icon, Header, Message, Input, Container, Segment, Grid,} from 'semantic-ui-react';
import { InlineMath } from 'react-katex';
import {EnterData} from '../EnterData';
import {Graph} from '../Graph';
import {PolynomialKatex} from './PolynomialKatex';

export const PolynomialRegressionTool = props => {
    const [error, setError] = React.useState();
    const [deg, setDeg]     = React.useState(props.deg);
    const [coef, setCoef]   = React.useState(props.coef);
    const [graph, setGraph] = React.useState(<Graph/>);
    const [data, setData]   = React.useState(props.data);

    const apiReq = () => {
        let req = {x: [], y: [], maxDeg: deg};
        for (let i = 0; i < data.length; i++) {
            const coordinate = data[i];
            const xCoordinate = coordinate.x;
            const yCoordinate = coordinate.y;

            if (isNaN(xCoordinate) || isNaN(yCoordinate)) { continue; }

            req.x.push(Number(xCoordinate));
            req.y.push(Number(yCoordinate));
        }

        fetch(props.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req),
        })
            .then(r => r.json())
            .then(r => {
                if (r.coef != undefined) {
                    // Round away super small numbers
                    for (let i = 0; i < r.coef.length; i++) {
                        if (Math.abs(r.coef[i]) < 0.0001)
                            r.coef[i] = null;
                    }

                    const newFn = x => {
                        let y = 0;
                        for (let j = 0; j < r.coef.length; j++) {
                            if (r.coef[j] != null)
                                y += r.coef[j] * Math.pow(x, j);
                        }
                        return y;
                    };

                    setCoef(r.coef);
                    setError(null);
                    setGraph(<Graph fn={newFn} />);
                } else if (r.message == undefined) {
                    setError("Internal server error");
                } else if (/near-singular/.test(r.message)) {
                    setError(
                        <>
                          <p>
                            The data you provided is close to being a singular matrix. Make sure there are no duplicate x values, or add more data.
                          </p>
                          <p>
                            The server response: {r.message}
                          </p>
                        </>
                    );
                } else {
                    setError(r.message);
                }
            })
            .catch(r => setError(r));
    };

    return (
        <Grid stackable>
          <Grid.Row>
            <Grid.Column>
              {error && <Message negative>
                  <Message.Header>Error:</Message.Header>
                  {error}
                </Message>}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns='equal'>
            <Grid.Column textAlign='center'>
              <Button.Group>
                <Popup trigger={<Button>Polynomial degree: {deg}</Button>}>
                  <p>
                    Sets the degree of the polynomial that will fit your data points.
                    E.g. <InlineMath>{"3"}</InlineMath> will fit your data to <InlineMath>{"ax^3+bx^2+cx+d"}</InlineMath>.{" "}
                    <InlineMath>{"0"}</InlineMath> will try to fit to a constant, but that probably isn't helpful.
                  </p>
                  <p>
                    The max allowed is {props.maxDeg}.
                  </p>
                </Popup>
                <Button disabled={deg > props.maxDeg} icon="plus"  onClick={() => setDeg(deg + 1)} />
                <Button disabled={deg < 1}            icon="minus" onClick={() => setDeg(deg - 1)} />
              </Button.Group>{" "}
              {graph}
              <PolynomialKatex coef={coef} />
            </Grid.Column>
            <Grid.Column>
              <EnterData data={data} setData={setData} action={apiReq} maxDim={2}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
};

PolynomialRegressionTool.defaultProps = {
    deg: 2,
    maxDeg: 5,
    decimalPlaces: 3,
    data: [{x: undefined, y: undefined}],
    endpoint: "/api/tools/poly-reg",
};
