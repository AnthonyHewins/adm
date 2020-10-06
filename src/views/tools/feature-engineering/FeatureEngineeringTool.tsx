import React from 'react';
import {Matrix} from '../../../api/tools/matrix'
import {AppError} from '../../../api/core'
import {featureEngineering, Modes} from '../../../api/tools/featureEngineering'
import {Grid, Form, Message, Checkbox } from 'semantic-ui-react';

import {EnterData} from '../EnterData';
import {DataView} from '../DataView';

export interface FeatureEngineeringToolProps {
    endpoint?: string;
    output?:   number[][];

    mode?:     Modes;
    data?:     string[][];
    message?:  React.ReactNode;
}

interface FeData {
    imputedData?: number[][];
    err?:         React.ReactNode;
}

export function FeatureEngineeringTool({
    endpoint = "/api/tools/feature-engineering",
    data     = undefined,
    output   = undefined,
    mode     = Modes.zScore,
    message  = undefined,
}: FeatureEngineeringToolProps) {
    const [currentMode, setCurrentMode] = React.useState(mode);
    const [feData, setFeData]           = React.useState({imputedData: output, err: message} as FeData)

    const apiReq = (m: Matrix) => {
        if (m.length < 2) {
            setFeData({err:
                <Message negative>
                    <Message.Header>Error:</Message.Header>
                    At least 2 points needed for feature engineering
                </Message>
            })
            return
        }

        featureEngineering(
            m,
            currentMode,
            (apiResult: number[][]) => setFeData({imputedData: apiResult} as FeData),
            (err: AppError)      => setFeData({err: err.toMessage()}   as FeData),
            endpoint
        )
    };

    return (
        <Grid stackable>
            <Grid.Row columns='equal'>
                <Grid.Column>
                    {feData.err}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row columns='equal'>
                <Grid.Column>
                    <Form>
                        <Form.Field>
                            <Checkbox
                                radio
                                label='Z score'
                                checked={currentMode === Modes.zScore}
                                onChange={() => setCurrentMode(Modes.zScore)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                radio
                                label='Mean Normalization'
                                checked={currentMode === Modes.meanNormalization}
                                onChange={() => setCurrentMode(Modes.meanNormalization)}
                            />
                        </Form.Field>
                    </Form>
                    <DataView data={feData.imputedData} />
                </Grid.Column>
                <Grid.Column>
                    <EnterData data={data} action={apiReq} minDim={1}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};
