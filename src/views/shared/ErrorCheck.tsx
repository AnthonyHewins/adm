import React from 'react'
import {List, Icon} from 'semantic-ui-react';

interface checkProps {
    err: boolean | number,
    name: string,
}

const ErrorCheck = (props: checkProps) => {
    const icon = Boolean(props.err) ? <Icon color='red' name='close'/> : <Icon color='green' name='check'/>;

    return (
        <List.Item>
            {icon}
            <List.Content>
                {props.name}
            </List.Content>
        </List.Item>
    );
};

export default ErrorCheck
