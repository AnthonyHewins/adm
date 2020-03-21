import React from 'react';
import {StrongHeader} from './StrongHeader';
import {Link} from 'react-router-dom';
import {BlockMath} from 'react-katex';
import {
  LineChart,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Scatter,
  Line,
} from 'recharts';
import {
  Container,
  Header,
  Grid,
} from 'semantic-ui-react';

export function Tools(props) {
  let svcClass1 = [], svcClass2 = [], svcClass3 = [];
  let random = [], engineered = [];
  let distroEstimator = [];
  for (let i = 1; i < 50; i++) {
    let avg = 0;
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

  let normalDist = [];
  const normalDistConstant = 1 / (Math.sqrt(2 * Math.PI));
  for (let i = -5; i <= 5; i += 1) {
    normalDist.push({x: i, y: normalDistConstant * Math.pow(
      Math.E, -Math.pow(i, 2) / 2
    )});
  }

  const Tool = (props) => (
    <Grid.Row as={Link} to={props.link} verticalAlign='middle' textAlign='center' columns={2}>
      <Grid.Column>
        {props.children}
      </Grid.Column>
      <Grid.Column>
        <Header>
          <Header.Content className="hugeheader-mobile">
            {props.name}
          </Header.Content>
          <Header.Subheader className='hugeheader-mobile'>
            Click here
          </Header.Subheader>
        </Header>
      </Grid.Column>
    </Grid.Row>
  );

  return (
    <>
      <div style={{marginTop: 40, marginBottom: 40}}>
        <StrongHeader>
          Toolset
        </StrongHeader>
      </div>

      <Container>
        <Grid stackable>

          <Tool name="Polynomial regression" link='/tools/poly-reg'>
            <ScatterChart width={350} height={250}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="x" name="stature" unit="g" />
              <YAxis dataKey="y" name="weight" unit="ppm" />

              <Scatter name="Samples"  data={distroEstimator} fill="hsl(0, 100%, 35%)" />
            </ScatterChart>
          </Tool>

          <Tool link='/tools/feature-engineering' name='Feature engineering'>
            <ScatterChart width={350} height={250}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" dataKey="x" name="displacement" unit="N" />
              <YAxis type="number" dataKey="y" name="mass" unit="C" />
              <ZAxis type="number" dataKey="z" name="type" unit="class" />

              <Scatter data={random}     fill="hsl(30, 100%, 65%)" />
              <Scatter data={engineered} fill="hsl(30, 100%, 25%)" />
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
