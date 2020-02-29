import React from 'react';
import PropTypes from 'prop-types';
import {Header, Responsive} from 'semantic-ui-react';

export function StrongHeader(props) {
  const header = (classname) => <Header textAlign={props.textAlign}>
                                  <Header.Content style={{color: props.color}} className={classname}>
                                    {props.children}
                                  </Header.Content>
                                </Header>;

  return (
    <>
      <Responsive maxWidth={687}>
        {header('hugeheader-mobile')}
      </Responsive>

      <Responsive minWidth={688} maxWidth={1199}>
        {header('hugeheader-desktop')}
      </Responsive>

      <Responsive minWidth={1200}>
        {header('hugeheader-widescreen')}
      </Responsive>
    </>
  );
}

StrongHeader.propTypes = {
  color: PropTypes.string,
  textAlign: PropTypes.string,
};

StrongHeader.defaultProps = {
  color: 'black',
  textAlign: 'center',
};
