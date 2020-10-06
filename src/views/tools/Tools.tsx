import React from 'react';
import {Link} from 'react-router-dom';
import {
  Line,
  LineChart,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Scatter,
} from 'recharts';
import {
  Container,
  Header,
  Grid,
} from 'semantic-ui-react';

export function Tools(props) {
  const svcClass1 = [], svcClass2 = [], svcClass3 = [];
  const random = [], engineered = [];
  const distroEstimator = [];

  for (let i = 1; i < 50; i++) {
    if (i < 79) {
      distroEstimator.push({x: i, y: (Math.random() * 5) % 5});
    } else if (i < 89) {
      for (let j = 0; j < 3; j++) {
        distroEstimator.push({x: i, y: (Math.random() * i) % 9});
      }
    } else {
      for (let j = 0; j < 7; j++) {
        distroEstimator.push({x: i, y: (Math.random() * i) % 40});
      }
    }

    if (i < 25) {
      svcClass1.push({x: i, y: (55  * Math.random())      });
      svcClass2.push({x: i, y: (70  * Math.random()) + 50 });
      svcClass3.push({});
    } else {
      svcClass3.push({x: i, y: (100 * Math.random())      });
    }

    if (i <= 10) {
      random.push({x: i, y: Math.random() % 10});
      engineered.push({x: i, y: i / 10});
    }
  }

  const normalDist = [];
  const normalDistConstant = 1 / (Math.sqrt(2 * Math.PI));
  for (let i = -5; i <= 5; i += 1) {
    normalDist.push({x: i, y: normalDistConstant * Math.pow(
      Math.E, -Math.pow(i, 2) / 2
    )});
  }

  const Tool = (props) => (
    <Grid.Row as={Link} to={props.link} verticalAlign='middle' columns={2}>
      <Grid.Column floated='left'>
        {props.children}
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Header>
          <Header.Content className="weak">
            {props.name}
          </Header.Content>
          <Header.Subheader className='slimjoe'>
            Click here
          </Header.Subheader>
        </Header>
      </Grid.Column>
    </Grid.Row>
  );

  return (
    <>
      <Header as="h1" textAlign='center'>
        <Header.Content className='strong'>
          Toolset
        </Header.Content>
      </Header>

      <Container>
        <Grid divided='vertically' stackable>

          <Tool name="Polynomial regression" link='/tools/poly-reg'>
            <LineChart width={300} height={250} data={distroEstimator}>
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="y" stroke="#82ca9d" />
            </LineChart>
          </Tool>

          <Tool link='/tools/feature-engineering' name='Feature engineering'>
            <ScatterChart width={300} height={250}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" dataKey="x" name="displacement" unit="N" />
              <YAxis type="number" dataKey="y" name="mass" unit="C" />
              <ZAxis type="number" dataKey="z" name="type" unit="class" />

              <Scatter className="" data={random}     fill="hsl(30, 100%, 65%)" />
              <Scatter className="" data={engineered} fill="hsl(30, 100%, 25%)" />
            </ScatterChart>
          </Tool>
        </Grid>
      </Container>
    </>
  );
}

/*
  <Tool link='/tools/svc' name='Support vector classifier'>
  <ScatterChart width={350} height={250}>
  <CartesianGrid strokeDasharray="3 3" />

  <XAxis type="number" dataKey="x" name="displacement" unit="cm" />
  <YAxis type="number" dataKey="y" name="mass" unit="kg" />
  <ZAxis type="number" dataKey="z" name="type" unit="class" />

  <Scatter name="Millenial" data={svcClass1} fill="hsl(240, 100%, 75%)" shape="triangle"/>
  <Scatter name="Boomer"    data={svcClass2} fill="hsl(240, 100%, 50%)" shape="square"/>
  <Scatter name="Gen Z"     data={svcClass3} fill="hsl(240, 100%, 25%)" shape="cross"/>
  </ScatterChart>
  </Tool>
*/
