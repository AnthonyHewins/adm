import React from 'react';
import {Loader, Dimmer, Icon, Header, Input, Container, Segment, Grid,} from 'semantic-ui-react';
import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {EnterData} from './EnterData';
import {StrongHeader} from '../StrongHeader';

const STATUS = {
  BLANK: 0,
  DATA_READY: 1,
  RENDERED: 2,
};

export function PolynomialRegression(props) {
  const [status, setStatus] = React.useState(STATUS.BLANK);
  const [error, setError] = React.useState();
  const [data, setData] = React.useState([{x: undefined, y: undefined}]);

  const [graph, setGraph] = React.useState(
    <Segment placeholder>
      <Header icon>
        <Header.Content>
          <Icon name='th'/>
          No polynomial
        </Header.Content>
        <Header.Subheader>
          Enter some data for it to be graphed.
        </Header.Subheader>
      </Header>
    </Segment>
  );

  switch(status) {
  case STATUS.DATA_READY:
    setGraph(
      <Segment>
        <Dimmer active>
          <Loader>Checking data...</Loader>
        </Dimmer>
      </Segment>
    );

    let req = {x: [], y: []};
    for (let i = 0; i < data.length; i++) {
      const coordinate = data[i];
      const xCoordinate = coordinate.x;
      const yCoordinate = coordinate.y;

      if (isNaN(xCoordinate) || isNaN(yCoordinate)) { continue; }

      req.x.push(xCoordinate);
      req.y.push(yCoordinate);
    }

    setGraph(
      <Segment>
        <Dimmer active>
          <Loader>Making API calls...</Loader>
        </Dimmer>
      </Segment>
    );

    const resp = fetch("http://127.0.0.1:8080/tools/polyreg", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: '*cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      'redirect': 'follow',
      'referrerPolicy': 'no-referrer',
      'body': JSON.stringify(req),
    });

    setGraph(
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={[]}>
          <Line type="monotone" dataKey="x" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="x" />
          <YAxis dataKey="y" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    );

    setStatus(STATUS.RENDERED);
    break;
  case STATUS.ERROR:

  default:
    break;
  }
  return <>
     <div style={{marginTop: 40, marginBottom: 40}}>
       <StrongHeader>
         Polynomial Regression
       </StrongHeader>
     </div>
     <Container>
       <Grid>
         <Grid.Row columns='equal'>
           <Grid.Column>
             {graph}
           </Grid.Column>
           <Grid.Column>
             <EnterData data={data} setData={setData} action={() => setStatus(STATUS.DATA_READY)} maxDim={2}/>
           </Grid.Column>
         </Grid.Row>
       </Grid>
     </Container>
   </>;
}
