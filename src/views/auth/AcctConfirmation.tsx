import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { acctConfirmation } from '../../api/user/acctConfirmation';
import { AppAffirmative, AppError } from '../../api/core';

type AcctConfirmationProps = {
  endpoint: string;
  routerProps: any;
};

const AcctConfirmation: React.FC<AcctConfirmationProps> = ({ endpoint, routerProps }) => {
  const [componentState, setComponentState] = React.useState({
    loading: true,
    jsx: <></>,
  });

  if (componentState.loading) {
    acctConfirmation(
      routerProps.match.params.token,
      (x: AppAffirmative) =>
        setComponentState({
          jsx: (
            <Container>
              {x.toMessage()}
              <p>Visit the login page to log in.</p>
            </Container>
          ),
          loading: false,
        }),
      (e: AppError) => {
        switch (e.code) {
          case 'late':
          case 'server':
            setComponentState({
              jsx: <Container>{e.toMessage()}</Container>,
              loading: false,
            });
            break;
          default:
            console.log(e);
            // TODO this might be beter handled as a 404 history push
            setComponentState({
              jsx: (
                <Container>
                  <Header>404</Header>
                </Container>
              ),
              loading: false,
            });
            break;
        }
      },
      endpoint,
    );
  }

  return componentState.jsx;
};

export default AcctConfirmation;
