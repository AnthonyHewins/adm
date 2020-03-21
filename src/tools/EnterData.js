import React from 'react';
import {Segment, Icon, Input, Grid, Button} from 'semantic-ui-react';

export const DIM_KEYS = ['x', 'y', 'z', 't'];
const defaultData = [
  {x: undefined, y: undefined, z: undefined, t: undefined},
];

export function EnterData(props) {
  const [dim, setDim] = React.useState(props.dim);

  let formFields = [];
  let accessibleDims = DIM_KEYS.slice(0, dim);

  for (let i = 0; i < props.data.length; i++) {
    const pt = props.data[i];

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
                error={current != undefined && isNaN(current)}
                onChange={e => {
                  const clone = props.data.slice(0);
                  pt[key] = e.target.value;
                  clone[i] = pt;
                  props.setData(clone);
                }}
              />
            </Grid.Column>
          );
        })}
        <Grid.Column>
          <Button
            negative
            floated='right'
            disabled={props.data.length <= 1}
            icon="close"
            onClick={() => props.setData(props.data.slice(0, i).concat( props.data.slice(i + 1) ))}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }

  const IncrementDecrement = (props) => (
    <Button.Group fluid>
      <Button>
        {props.title}
      </Button>
      <Button disabled={props.disableInc} onClick={props.increment}
              icon='plus' />
      <Button disabled={props.disableDec} onClick={props.decrement}
              icon='minus' />
    </Button.Group>
  );

  const controls = (
    <Grid>
      <Grid.Row columns='equal'>
        <Grid.Column>
          <IncrementDecrement
            title="Points"
            increment={() => props.setData(props.data.concat(
              [{x: undefined, y: undefined, z: undefined, t: undefined}]
            ))}
            decrement={() => props.setData(props.data.slice(0, props.data.length - 1))}
            disableInc={props.data.length >= props.maxPoints}
            disableDec={props.data.length <= props.minPoints}
          />
        </Grid.Column>
        <Grid.Column>
          <IncrementDecrement
            title="Dimensions"
            increment={() => setDim(dim + 1)}
            decrement={() => setDim(dim - 1)}
            disableInc={dim >= props.maxDim}
            disableDec={dim <= props.minDim}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns='equal'>
        {props.action != undefined && <Grid.Column>
                                      <Button primary animated fluid onClick={props.action}>
                                        <Button.Content hidden>
                                          <Icon name='right arrow'/>
                                        </Button.Content>
                                        <Button.Content visible>
                                          Submit
                                        </Button.Content>
                                      </Button>
                                    </Grid.Column>}
        <Grid.Column>
          <Button negative fluid animated onClick={() => {
            props.setData(defaultData);
            setDim(props.dim);
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

EnterData.defaultProps = {
  dim: 2,
  maxDim: 4,
  minDim: 2,
  maxPoints: 100,
  minPoints: 1,
  data: defaultData,

  setData: (data) => null,
  action: undefined,
};
