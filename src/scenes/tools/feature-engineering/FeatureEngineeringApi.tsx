import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import Highlight from 'react-highlight';
import 'highlight.js/styles/solarized-dark.css';

type ApiProps = {
  endpoint: string
}

const FeatureEngineeringApi: React.FC<ApiProps> = ({ endpoint = '/api/tools/feature-engineering' }) => {
  return (
    <>
      <Header>
        <Header.Content>
          <pre>POST {endpoint}</pre>
        </Header.Content>
      </Header>

      <p>This endpoint performs basic feature scaling techniques over a rectangular matrix with up to 100 elements.</p>

      <Header>
        <Header.Content className="mid">Request</Header.Content>
      </Header>

      <p className="weak">Headers</p>

      <Table basic>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Content-Type</Table.Cell>
            <Table.Cell>
              <pre>application/json</pre>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <p className="weak">Payload</p>

      <Highlight className="JSON">
        {`{
\t"x": [[1, 2, 3], ...],
\t"mode": "zscore",
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
            <Table.Cell>
              <pre>x</pre>
            </Table.Cell>
            <Table.Cell>
              <pre>[][]float64</pre>
            </Table.Cell>
            <Table.Cell>The feature matrix</Table.Cell>
            <Table.Cell>
              <pre>{'len(x) * len(x[0]) <= 100'}</pre>
              <pre>len(y) == len(z) &forall;y,z&isin;x</pre>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <pre>mode</pre>
            </Table.Cell>
            <Table.Cell>
              <pre>string</pre>
            </Table.Cell>
            <Table.Cell>Which method of scaling to use</Table.Cell>
            <Table.Cell>
              <pre>mode &isin; &#123;zscore, mean-normalization&#125;</pre>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Header>
        <Header.Content className="mid">Response</Header.Content>
      </Header>

      <p className="weak">HTTP codes</p>

      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Code</Table.HeaderCell>
            <Table.HeaderCell>Occurs when</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <pre>200</pre>
            </Table.Cell>
            <Table.Cell>Request processed successfully</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <pre>204</pre>
            </Table.Cell>
            <Table.Cell>
              <pre>{'len(x) <= 1'}</pre>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <pre>400</pre>
            </Table.Cell>
            <Table.Cell>Request malformed; arguments missing or not the proper type</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <pre>422</pre>
            </Table.Cell>
            <Table.Cell>Invalid params; check validations</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <pre>500</pre>
            </Table.Cell>
            <Table.Cell>General error</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <p className="weak">Payload</p>

      <Highlight className="json">
        {`// HTTP 200 Success
{
\t"x": [[0.3432, 0.43262, 1.042], ...],
}

// HTTP 422/500 Failure
{
\t"error": "length-mismatch",
\t"message": "need a rectangular matrix, but row...",
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
            <Table.Cell>
              <pre>x</pre>
            </Table.Cell>
            <Table.Cell>
              <pre>[][]float64</pre>
            </Table.Cell>
            <Table.Cell>New scaled feature</Table.Cell>
            <Table.Cell>Same as the restrictions on the request</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <pre>error</pre>
            </Table.Cell>
            <Table.Cell>
              <pre>string</pre>
            </Table.Cell>
            <Table.Cell>Shorthand description for switch cases</Table.Cell>
            <Table.Cell>
              <pre>error &isin; {"{'param', 'length-mismatch', 'cmd', 'length', 'server'}"}</pre>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <pre>message</pre>
            </Table.Cell>
            <Table.Cell>
              <pre>string</pre>
            </Table.Cell>
            <Table.Cell>Detailed explanation of the error</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
};

export default FeatureEngineeringApi;
