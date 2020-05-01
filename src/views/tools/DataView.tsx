import React from 'react';
import {Form, Button, TextArea, Segment, Header, Icon} from 'semantic-ui-react';
import {CSVLink} from 'react-csv';

export interface DataViewProps {
   data?: number[][]
}

export function DataView({
    data = []
}: DataViewProps) {
    const textRef = React.useRef(null);

    if (data.length === 0) {
        return (
            <Segment placeholder>
              <Header icon>
                <Header.Content>
                  <Icon name='th'/>
                  No data
                </Header.Content>
              </Header>
            </Segment>
        );
    }

    let csv = data.map(i => i.map(j => j.toString()).join(',')).join("\r\n");

    return (
        <>
          <Form>
            <TextArea ref={textRef} value={csv}/>
          </Form>
          <br/>
          <Button content="Copy"
                  icon='copy'
                  onClick={() => navigator.clipboard.writeText(csv)}
                  labelPosition="left" />
          <Button as={CSVLink}
                  filename="feature-scaling.csv"
                  data={data}
                  content="Download as CSV"
                  color='green'
                  icon='align justify'
                  labelPosition="left" />
        </>
    );
};
