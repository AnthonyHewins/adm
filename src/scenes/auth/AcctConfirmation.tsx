import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import acctConfirmation from 'services/user/acctConfirmation';

const AcctConfirmation: React.FC = () => {
  const [componentState, setComponentState] = React.useState({
    loading: true,
    jsx: <></>,
  });

  if (componentState.loading) {
    acctConfirmation(
      "CHANGE ME",
    );
  }

  return componentState.jsx;
};

export default AcctConfirmation;
