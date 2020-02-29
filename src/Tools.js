import React from 'react';
import {StrongHeader} from './StrongHeader';
import {Link} from 'react-router-dom';
import {
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

          <Tool name="Fit a distribution to a dataset" link='/tools/poly-reg'>
              <ScatterChart width={350} height={250} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="x" name="stature" unit="g" />
                <YAxis dataKey="y" name="weight" unit="ppm" />

                <Tooltip cursor={{ strokeDasharray: '3 3' }} />

                <Scatter name="Samples"  data={distroEstimator} fill="#8884d8" />
              </ScatterChart>
          </Tool>

          <Tool link='/tools/svc' name='Support vector classifier'>
            <ScatterChart width={350} height={250} margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" dataKey="x" name="displacement" unit="cm" />
              <YAxis type="number" dataKey="y" name="mass" unit="kg" />
              <ZAxis type="number" dataKey="z" name="type" unit="class" />

              <Tooltip cursor={{ strokeDasharray: '3 3' }} />

              <Scatter name="Millenial" data={svcClass1} fill="#ff0000" shape="triangle"/>
              <Scatter name="Boomer" data={svcClass2} fill="#00ff00" shape="square"/>
              <Scatter name="Gen Z" data={svcClass3} fill="#0000ff" shape="cross"/>
            </ScatterChart>
          </Tool>

          <Tool link='/tools/feature-engineering' name='Feature engineering'>
            <h1>ayyy</h1>
          </Tool>

        </Grid>
      </Container>
    </>
  );
}
