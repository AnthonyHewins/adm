import React from 'react';
import { Grid, Form, Message, Checkbox } from 'semantic-ui-react';

import { Matrix } from 'services/tools/matrix';
import Modes from 'services/enums';
import { EnterData } from 'components/EnterData';
import { DataView } from 'components/DataView';

type FeatureEngineeringToolProps = {
  output?: number[][];

  mode?: Modes;
  data?: string[][];
  message?: React.ReactNode;
}

type FeData = {
  imputedData?: number[][];
  err?: React.ReactNode;
}

const FeatureEngineeringTool: React.FC<FeatureEngineeringToolProps> = ({
  endpoint,
  data,
  output,
  mode = Modes.zScore,
  message,
}) => {
  const [currentMode, setCurrentMode] = React.useState(mode);
  const [feData, setFeData] = React.useState({ imputedData: output, err: message } as FeData);

  const apiReq = (m: Matrix) => {
    if (m.length < 2) {
      setFeData({
        err: (
          <Message negative>
            <Message.Header>Error:</Message.Header>
            At least 2 points needed for feature engineering
          </Message>
        ),
      });
      return;
    }

    featureEngineering(
      m,
      currentMode,
      (apiResult: number[][]) => setFeData({ imputedData: apiResult } as FeData),
      (err: AppError) => setFeData({ err: err.toMessage() } as FeData),
      endpoint,
    );
  };

  return (
    <Grid stackable>
      <Grid.Row columns="equal">
        <Grid.Column>{feData.err}</Grid.Column>
      </Grid.Row>
      <Grid.Row columns="equal">
        <Grid.Column>
          <Form>
            <Form.Field>
              <Checkbox
                radio
                label="Z score"
                checked={currentMode === Modes.zScore}
                onChange={() => setCurrentMode(Modes.zScore)}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label="Mean Normalization"
                checked={currentMode === Modes.meanNormalization}
                onChange={() => setCurrentMode(Modes.meanNormalization)}
              />
            </Form.Field>
          </Form>
          <DataView data={feData.imputedData} />
        </Grid.Column>
        <Grid.Column>
          <EnterData data={data} action={apiReq} minDim={1} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FeatureEngineeringTool;
