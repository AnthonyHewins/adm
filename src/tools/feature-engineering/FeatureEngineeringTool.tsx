import React from 'react';
import {Grid, Form, Message, Checkbox } from 'semantic-ui-react';

import {EnterData, DIM_KEYS} from '../EnterData';
import {DataView} from '../DataView';

export const FeatureEngineeringTool = props => {
    const [error, setError]   = React.useState();
    const [output, setOutput] = React.useState();
    const [mode, setMode]     = React.useState(props.mode);
    const [input, setInput]   = React.useState(props.data);

    const apiReq = () => {
        if (input.length < 2) {
            setError("Feature scaling can only be done with at least 2 data points");
            return;
        }

        let dims, dim;
        const firstCoordinate = DIM_KEYS.map(dim => input[0][dim]);
        for (dim = 0; dim < DIM_KEYS.length; dim++) {
            if (isNaN(firstCoordinate[dim])) {
                if (dim === 0) {
                    setError("The first coordinate must be filled in correctly to check all the others");
                    return;
                } else {
                    break;
                }
            }
        }

        if (dim * input.length > 100) {
            setError("100 data points is the max; got " + dim.toString() + "x" + input.length.toString());
            return;
        }

        dims = DIM_KEYS.slice(0,dim);

        const req = {
            x: input.map(point => dims.map(dim => Number(point[dim])))
                .filter(point => dims.some(dim => isNaN(point[dim]))),
            mode: mode,
        };

        fetch(props.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req),
        })
            .then(r => r.json())
            .then(r => {
                setError(undefined);
                setOutput(r.x);
            })
            .catch(r => setError(r.toString()));
    };

    return (
        <Grid stackable>
          <Grid.Row columns='equal'>
            <Grid.Column>
              {error && <Message negative>
                          <Message.Header>Error:</Message.Header>
                          {error}
                        </Message>}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns='equal'>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <Checkbox
                    radio
                    label='Z score'
                    checked={mode === 'zscore'}
                    onChange={() => setMode('zscore')}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label='Mean Normalization'
                    checked={mode === 'mean-normalization'}
                    onChange={() => setMode('mean-normalization')}
                  />
                </Form.Field>
              </Form>
              <DataView data={output} />
            </Grid.Column>
            <Grid.Column>
              <EnterData setData={setInput} data={input} action={apiReq} minDim={1}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
};

FeatureEngineeringTool.defaultProps = {
    mode: "zscore",
    endpoint: "/api/tools/feature-engineering",
    data: [{x: undefined, y: undefined}],
};
