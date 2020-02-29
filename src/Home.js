import React from 'react';
import {
    Icon,
    Container,
    Grid,
    List,
    Dimmer,
    Header,
    Image,
    Responsive,
    Transition
} from 'semantic-ui-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import plato from './images/plato.png';

export function Home(props) {
    const header = (classname) => <Header textAlign='center'>
                                    <Header.Content style={{color: 'white'}} className={classname}>
                                      Artifex de machina
                                    </Header.Content>
                                  </Header>;

    let data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            name: i,
            i: (Math.random() * 300) + 200,
            j: (Math.random() * 300),
            k: (Math.random() * 100),
        });
    }


    return (
        <>
          <Dimmer.Dimmable blurring active={true}>
            <Image fluid src={plato} style={{marginTop: -13}}/> {/* to make it line up with the menu */}

            <Dimmer active={true}>
              <Responsive maxWidth={687}>
                {header('hugeheader-mobile')}
              </Responsive>

              <Responsive minWidth={688} maxWidth={1199}>
                {header('hugeheader-desktop')}
              </Responsive>

              <Responsive minWidth={1200}>
                {header('hugeheader-widescreen')}
              </Responsive>

            </Dimmer>
          </Dimmer.Dimmable>

          <Header as='h1' textAlign='center'>
            <Header.Content className='hugeheader-mobile'>
              Data science and full stack solutions
            </Header.Content>
            <Header.Subheader className='hugeheader-mobile'>
              The future of all economies and the world
            </Header.Subheader>
          </Header>
          <Container>

            <p>
              Adoption of cutting edge machine learning
              is the path to making the world economy more efficient.
            </p>

            <p>
              Staying ahead of the curve requires the right positioning.
            </p>

            <Grid stackable>
              <Grid.Row columns={2}>
                <Grid.Column floated='left'>
                  <LineChart width={300} height={300} data={data}>
                    <Line type="monotone" dataKey="i" stroke="#8884d8" />
                    <Line type="monotone" dataKey="j" stroke="#ff0000" />
                    <Line type="monotone" dataKey="k" stroke="#00ff00" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>

                </Grid.Column>
                <Grid.Column>
                  <List bulleted className='hugeheader-mobile'>
                    <List.Item>
                      <List.Content verticalAlign='middle'>
                        Large Companies are too slow to pick up on trends, and are inefficient
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      Bad choices accumulate interest in large companies, and it's passed off to the customer
                    </List.Item>
                    <List.Item>
                      Emerging technology is positioned to beat out all other solutions
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Container>

          <Header as='h1' size='large' textAlign='center'>
            <Header.Content className='hugeheader-mobile'>
              Understand your data before your competitors do
            </Header.Content>
          </Header>

          <Container>
            <List bulleted className='hugeheader-mobile'>
              <List.Item>
                46% of North American companies are looking into machine learning while 36% are adopting it, and they're knocking on your doorstep
              </List.Item>
              <List.Item>
                More things I can't think of yet
              </List.Item>
            </List>
          </Container>
        </>
    );
}
