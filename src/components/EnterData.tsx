import React from 'react';
import { Popup, Segment, Icon, Input, Grid, Button } from 'semantic-ui-react';
import Matrix from 'services/tools/matrix';

interface IncrementDecrementProps {
  title: string;
  tooltip: string;

  increment: () => void;
  decrement: () => void;
  disableInc: boolean;
  disableDec: boolean;
}

const IncrementDecrement = (props: IncrementDecrementProps) => (
  <Button.Group fluid>
    <Popup trigger={<Button>{props.title}</Button>}>{props.tooltip}</Popup>
    <Button disabled={props.disableInc} onClick={props.increment} icon="plus" />
    <Button disabled={props.disableDec} onClick={props.decrement} icon="minus" />
  </Button.Group>
);

export interface EnterDataProps {
  dimensions?: number;
  maxDim?: number;
  minDim?: number;
  maxPoints?: number;
  minPoints?: number;

  data?: (undefined | string)[][] | undefined;
  action?: (m: Matrix) => void;
}

export function EnterData({
  dimensions = 2,
  minDim = 1,
  maxDim = 4,
  minPoints = 1,
  maxPoints = 100,

  data = [[undefined, undefined]],
  action = (_: Matrix) => null,
}: EnterDataProps) {
  const [dim, setDim] = React.useState(dimensions);
  const [currentData, setCurrentData] = React.useState(data);

  let needsStateUpdate = false;
  const clone = currentData.map((row) => {
    if (row.length === dim) return row;

    needsStateUpdate = true;
    if (row.length < dim) return row.concat(new Array(dim - row.length).fill(undefined));
    else return row.slice(0, dim);
  });

  if (needsStateUpdate) {
    setCurrentData(clone);
  }

  const formFields = [];
  let hasErrors = false;

  for (let i = 0; i < currentData.length; i++) {
    const pt: string[] = currentData[i];

    const cols = [];
    for (let j = 0; j < pt.length; j++) {
      const current: string | undefined = pt[j];
      const err = current !== undefined && (isNaN(Number(current)) || current === '');
      hasErrors = hasErrors || err;

      cols.push(
        <Grid.Column key={j}>
          <Input
            fluid
            placeholder={`(${i}, ${j})`}
            value={current || ''}
            error={err}
            onChange={(e) => {
              const clone = currentData.slice(0);
              clone[i][j] = e.target.value;
              setCurrentData(clone);
            }}
          />
        </Grid.Column>,
      );
    }

    formFields.push(
      <Grid.Row key={i} columns="equal">
        {cols}
        <Grid.Column>
          <Button
            negative
            floated="right"
            disabled={currentData.length <= 1}
            icon="close"
            onClick={() => setCurrentData(currentData.slice(0, i).concat(currentData.slice(i + 1)))}
          />
        </Grid.Column>
      </Grid.Row>,
    );
  }

  const onClick = () => {
    const matrix = currentData.reduce((filtered: number[][], current: string[] | undefined[]) => {
      const row = [];
      for (let i = 0; i < current.length; i++) {
        if (current[i] === '') return filtered;

        const asNum = Number(current[i]);
        if (isNaN(asNum)) return filtered;

        row.push(asNum);
      }

      filtered.push(row);
      return filtered;
    }, []);

    action(new Matrix(matrix));
  };

  const controls = (
    <Grid>
      <Grid.Row columns="equal">
        <Grid.Column>
          <IncrementDecrement
            title="Points"
            tooltip={`Increment/decrement the number of points. Max is ${maxPoints}, min is ${minPoints}.`}
            increment={() => setCurrentData(currentData.concat([new Array(dim).fill(undefined)]))}
            decrement={() => setCurrentData(currentData.slice(0, currentData.length - 1))}
            disableInc={currentData.length >= maxPoints}
            disableDec={currentData.length <= minPoints}
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
      <Grid.Row columns="equal">
        <Grid.Column>
          <Button primary animated disabled={hasErrors} fluid onClick={onClick}>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
            <Button.Content visible>Submit</Button.Content>
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button negative fluid animated onClick={() => setCurrentData([new Array(dim).fill(undefined)])}>
            <Button.Content hidden>
              <Icon name="close" />
            </Button.Content>
            <Button.Content visible>Reset</Button.Content>
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  return (
    <Segment.Group compact>
      <Segment>{controls}</Segment>
      <Segment>
        <Grid>{formFields}</Grid>
      </Segment>
      <Segment>{controls}</Segment>
    </Segment.Group>
  );
}
