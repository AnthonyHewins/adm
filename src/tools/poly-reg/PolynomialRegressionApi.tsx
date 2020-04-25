import React from 'react';
import {Table, Header} from 'semantic-ui-react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/solarized-dark.css';

export const PolynomialRegressionApi = props => {
    return (
        <>
          <Header>
            <Header.Content>
              <pre>POST {props.endpoint}</pre>
            </Header.Content>
          </Header>

          <p>
            This endpoint runs polynomial regression using BLAS golang bindings.{" "}
            It makes use of the normal equation.
          </p>

          <Header>
            <Header.Content className="mid">
              Request
            </Header.Content>
          </Header>

          <p className="weak">
            Headers
          </p>

          <Table basic>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Content-Type</Table.Cell>
                <Table.Cell><pre>application/json</pre></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <p className="weak">
            Payload
          </p>

          <Highlight className="JSON">
            {`{
\t"x": [1, 2, ...],
\t"y": [1, 4, ...],
\t"maxDeg": 3
}`}
          </Highlight>

          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Field</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Validation</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell><pre>maxDeg</pre></Table.Cell>
                <Table.Cell><pre>uint8</pre></Table.Cell>
                <Table.Cell>The maximum degree to use for fitting the polynomial</Table.Cell>
                <Table.Cell><pre>{"maxDeg <= 5"}</pre></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><pre>x</pre></Table.Cell>
                <Table.Cell><pre>[]float64</pre></Table.Cell>
                <Table.Cell>The independent variable</Table.Cell>
                <Table.Cell><pre>{"maxDeg < len(x) <= 100"}</pre></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><pre>y</pre></Table.Cell>
                <Table.Cell><pre>[]float64</pre></Table.Cell>
                <Table.Cell>The dependent variable</Table.Cell>
                <Table.Cell><pre>{"maxDeg < len(y) <= 100"}</pre></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Header>
            <Header.Content className="mid">
              Response
            </Header.Content>
          </Header>

          <p className="weak">
            HTTP codes
          </p>

          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Code</Table.HeaderCell>
                <Table.HeaderCell>Occurs when</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell><pre>200</pre></Table.Cell>
                <Table.Cell>Request had no errors and matrix was not singular</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><pre>422</pre></Table.Cell>
                <Table.Cell>Invalid params; check validations</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><pre>500</pre></Table.Cell>
                <Table.Cell>General error; matrix may be singular</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <p className="weak">
            Payload
          </p>

          <Highlight className="json">
            {`// HTTP 200 Success
{
\t"coef": [0.3432, 0.43262, 1.042, ...],
}

// HTTP 422/500 Failure
{
\t"error": "server",
\t"message": "matrix near singular...",
}
`}
          </Highlight>

          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Field</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Validation</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell><pre>coef</pre></Table.Cell>
                <Table.Cell><pre>[]float64</pre></Table.Cell>
                <Table.Cell>The coefficients of the polynomial</Table.Cell>
                <Table.Cell><pre>{"len(coef) <= 6"}</pre></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><pre>error</pre></Table.Cell>
                <Table.Cell><pre>string</pre></Table.Cell>
                <Table.Cell>Shorthand description for switch cases</Table.Cell>
                <Table.Cell>
                  <pre>error &isin; {"{'param', 'deg', 'length', 'server'}"}</pre>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell><pre>message</pre></Table.Cell>
                <Table.Cell><pre>string</pre></Table.Cell>
                <Table.Cell>Detailed explanation of the error</Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
    );
};

PolynomialRegressionApi.defaultProps = {
    endpoint: "/api/tools/poly-reg",
};
