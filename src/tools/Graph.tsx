import React from 'react';
import {Segment, Header, Icon,} from 'semantic-ui-react';
import {ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export interface GraphProps {
    fn?: (arg0: number) => number,

    leftBound?:  number,
    rightBound?: number,
    width?:      string, // for some reason the rechart API requires this to be a string
    height?:     number,
}

export function Graph({
    fn         = undefined,
    leftBound  = -10,
    rightBound = 10,
    width      = "100%",
    height     = 400,
}: GraphProps) {
    if (fn == undefined) {
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
    for (let i = leftBound; i <= rightBound; i++) {
        plot.push({x: i, y: fn(i)});
    }

    return (
        <ResponsiveContainer width={width} height={height}>
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
