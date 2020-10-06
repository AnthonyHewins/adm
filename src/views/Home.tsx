import React from 'react';
import {
  Icon,
  Step,
  Container,
  Grid,
  List,
  Dimmer,
  Header,
  Image,
  Segment
} from 'semantic-ui-react';
import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import plato from '../images/plato.png';

export interface HomeProps {
    appName: string,
}

const defaultProps: HomeProps = {
    appName: "ARTIFEX DE MACHINA",
}

export function Home(props = defaultProps) {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      name: i,
      modern: i * 3,
      old: i * i + 5,
      ancient: Math.pow(2, i) + 7,
    });
  }

  return (
    <>
      <Dimmer.Dimmable blurring active="true">
        <Image fluid src={plato} style={{marginTop: -13}}/> {/* to make it line up with the menu; there's a gap normally */}

        <Dimmer active={true}>
          <Header inverted as="h1" textAlign='center'>
            <Header.Content className='showtime'>
                {props.appName}
            </Header.Content>
          </Header>
        </Dimmer>
      </Dimmer.Dimmable>

      <Header as='h1' textAlign='center'>
        <Header.Content className='weak'>
          Data science and full stack solutions
        </Header.Content>
        <Header.Subheader className='weak'>
          The future of every economy in the world
        </Header.Subheader>
      </Header>

      <Container>
        <Segment vertical padded='very'>
          <Step.Group size="large" widths={4}>
            <Step>
              <Icon name='circle outline'/>
              <Step.Content>
                <Step.Title>Tradition</Step.Title>
                <Step.Description>First steps</Step.Description>
              </Step.Content>
            </Step>

            <Step>
              <Icon name='factory' color='grey'/>
              <Step.Content>
                <Step.Title>Industrial revolution</Step.Title>
                <Step.Description>Debut of machines</Step.Description>
              </Step.Content>
            </Step>

            <Step active>
              <Icon name='terminal' color='green' />
              <Step.Content>
                <Step.Title>Information revolution</Step.Title>
                <Step.Description>We're still not done here</Step.Description>
              </Step.Content>
            </Step>

            <Step>
              <Icon loading circular size="huge" color="blue" name='react' />
              <Step.Content>
                <Step.Title>ML and AI</Step.Title>
                <Step.Description>On our way</Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>

          <p>
            Large sectors of industry haven't actualized the power of machine learning/AI.
            Others haven't locked in a foothold with the new tools of the information age.
            Some are still stuck in the industrial revolution.
            In order to keep your business at the edge, we offer expert solutions that can propel you
            into the future of machine learning and the information age.
          </p>

          <p>
            Companies that adopt cutting edge technology in this way are more than just ahead;
            they're several paradigm shifts in the future. We're here to do it for you when you can't
            do it yourself.
          </p>
        </Segment>

        <Segment vertical padded='very'>
          <Header as='h1' textAlign='center'>
            <Header.Content className='weak'>
              Avoid old school thought
            </Header.Content>
            <Header.Subheader className='weak'>
              Get ahead for less when you avoid large corporations
            </Header.Subheader>
          </Header>

          <p>
            Our experts have witnessed firsthand that large corporations act inefficiently,
            implementing solutions that don't scale, don't anticipate the
            future, cost too much and worst of all &mdash; don't work. So many companies out there
            fall victim to one of these tech sins:
          </p>

          <Grid stackable>
            <Grid.Row columns={2}>
                <Grid.Column floated='left'>
                    <LineChart width={350} height={350} data={data}>
                        <XAxis dataKey="name" label={
                            <Label value="months" offset={0} position="insideBottom" />
                        }/>
                            <YAxis unit="K"/>
                            <Line type="monotone" dataKey="modern" stroke="hsl(0, 100%, 75%)" />
                            <Line type="monotone" dataKey="old" stroke="hsl(0, 100%, 55%)" />
                            <Line type="monotone" dataKey="ancient" stroke="hsl(0, 100%, 35%)" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Tooltip />
                    </LineChart>
                </Grid.Column>
                <Grid.Column>
                    <List bulleted className='weak'>
                        <List.Item>
                            Large teams = large overhead
                            <List bulleted>
                                <List.Item>In communication with clients</List.Item>
                                <List.Item>In response to industry trends</List.Item>
                                <List.Item>In processes to complete an end product</List.Item>
                                <List.Item>Bloated management, scarce development</List.Item>
                            </List>
                        </List.Item>
                        <List.Item>
                            Lack of adoption in emerging technology
                            <List bulleted>
                                <List.Item>Old technology in last place is the first and only choice</List.Item>
                                <List.Item>Technically inept management and C levels</List.Item>
                                <List.Item>New technology geared for an industry upset too costly to switch to</List.Item>
                                <List.Item>Process management a century old</List.Item>
                            </List>
                        </List.Item>
                        <List.Item>
                            Can't part with dying technology
                            <List bulleted>
                                <List.Item>Everything you just read...all over again</List.Item>
                            </List>
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    </>
  );
}
