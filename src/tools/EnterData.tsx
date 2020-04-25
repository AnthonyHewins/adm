import React from 'react';
import {Popup, Segment, Icon, Input, Grid, Button} from 'semantic-ui-react';

export const DIM_KEYS = ['x', 'y', 'z', 't'];
export enum DimKeys {
    x = 'x',
    y = 'y',
    z = 'z',
    t = 't',
}

const defaultData: {[key:string]:string}[] = [
  {x: "", y: "", z: "", t: ""},
];

export interface EnterDataProps {
  dimensions?: number,
  maxDim?:     number,
  minDim?:     number,
  maxPoints?:  number,
  minPoints?:  number,
  data?:       vector[],

  setData?: (matrix: vector[]) => void,
  action?: () => void,
};

interface IncrementDecrementProps {
    title:   string,
    tooltip: string,

    increment:  () => void,
    decrement:  () => void,
    disableInc: boolean,
    disableDec: boolean,
}

const IncrementDecrement = (props: IncrementDecrementProps) => (
    <Button.Group fluid>
        <Popup trigger={<Button>{props.title}</Button>}>
            {props.tooltip}
        </Popup>
        <Button disabled={props.disableInc} onClick={props.increment}
                icon='plus' />
        <Button disabled={props.disableDec} onClick={props.decrement}
                icon='minus' />
    </Button.Group>
);

export function EnterData({dimensions = 2, maxDim = 4, minDim = 1, maxPoints = 100, minPoints = 1, data = defaultData, setData = (_) => null, action = () => null}: EnterDataProps) {
    const [dim, setDim] = React.useState(dimensions);

    let formFields = [];
    let accessibleDims = DIM_KEYS.slice(0, dim);

    for (let i = 0; i < data.length; i++) {
        const pt: vector = data[i];

        formFields.push(
            <Grid.Row key={i} columns='equal'>
            {accessibleDims.map(key => {
                let current = pt[key];

                return (
                    <Grid.Column key={key}>
                    <Input
                    fluid
                    placeholder={`${key}${i}`}
                    value={current || ''}
                    error={current !== undefined && isNaN(current)}
                    onChange={e => {
                        const clone = data.slice(0);
                        pt[key] = e.target.value;
                        clone[i] = pt;
                        setData(clone);
                    }}
                    />
            </Grid.Column>
                );
            })}
            <Grid.Column>
            <Button
            negative
            floated='right'
            disabled={data.length <= 1}
            icon="close"
            onClick={() => setData(data.slice(0, i).concat( data.slice(i + 1) ))}
            />
                    </Grid.Column>
      </Grid.Row>
        );
    }

    const controls = (
        <Grid>
            <Grid.Row columns='equal'>
                <Grid.Column>
                    <IncrementDecrement
                        title="Points"
                        tooltip={`Increment/decrement the number of points. Max is ${maxPoints}, min is ${minPoints}.`}
                        increment={() => setData(data.concat(
                            [{x: undefined, y: undefined, z: undefined, t: undefined}]
                        ))}
                        decrement={() => setData(data.slice(0, data.length - 1))}
                        disableInc={data.length >= maxPoints}
                        disableDec={data.length <= minPoints}
                    />
                </Grid.Column>
                <Grid.Column>
                    <IncrementDecrement
                        title="Dim"
                        tooltip={`Increment/decrement the dimension of each point. Max is ${maxDim}, min is ${minDim}.`}
                        increment={() => setDim(dim + 1)}
                        decrement={() => setDim(dim - 1)}
                        disableInc={dim >= maxDim}
                        disableDec={dim <= minDim}
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns='equal'>
                {action !== undefined && <Grid.Column>
                    <Button primary animated fluid onClick={action}>
                        <Button.Content hidden>
                            <Icon name='arrow right'/>
                        </Button.Content>
                        <Button.Content visible>
                            Submit
                        </Button.Content>
                    </Button>
                </Grid.Column>}
                <Grid.Column>
                    <Button negative fluid animated onClick={() => {
                        setData(defaultData);
                        setDim(dim);
                    }}>
                        <Button.Content hidden><Icon name='close'/></Button.Content>
                        <Button.Content visible>
                            Reset
                        </Button.Content>
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    return (
        <Segment.Group compact>
            <Segment>
                {controls}
            </Segment>
            <Segment>
                <Grid>
                    {formFields}
                </Grid>
            </Segment>
            <Segment>
                {controls}
            </Segment>
        </Segment.Group>
    );
}
