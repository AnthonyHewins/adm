import React from 'react';
import { List, Icon } from 'semantic-ui-react';

interface CheckProps {
  err: boolean | number;
  name: string;
}

const ErrorCheck: React.FC<CheckProps> = ({ err, name }) => {
  const icon = Boolean(err) ? <Icon color="red" name="close" /> : <Icon color="green" name="check" />;

  return (
    <List.Item>
      {icon}
      <List.Content>{name}</List.Content>
    </List.Item>
  );
};

export default ErrorCheck;
