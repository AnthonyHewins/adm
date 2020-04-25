import React from 'react';
import {Segment, Header, Icon,} from 'semantic-ui-react';
import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export const Graph = props => {
    if (props.fn == undefined) {
        return (
            <Segment placeholder>
              <Header icon>
                <Header.Content>
                  <Icon name='th'/>
                  No data
                </Header.Content>
                <Header.Subheader>
                  Enter some data for it to be graphed.
                </Header.Subheader>
              </Header>
            </Segment>
        );
    }

    let plot = [];
    for (let i = props.leftBound; i <= props.rightBound; i++) {
        plot.push({x: i, y: props.fn(i)});
    }

    return (
        <ResponsiveContainer width={props.width} height={props.height}>
          <LineChart data={plot}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="x"/>
            <YAxis/>
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
    );
};

Graph.defaultProps = {
    leftBound: -10,
    rightBound: 10,
    width: "100%",
    height: 400,
};
