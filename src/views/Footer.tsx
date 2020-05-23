import React from 'react';
import {List, Grid, Icon, Container, Divider} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export function Footer(props) {
  const link = (link) => (
    <List.Item key={link.url} as={Link} to={link.url}>
      {link.name}
    </List.Item>
  );

  return (
    <>
      <Divider />
      <Container>
        <Grid padded="vertically" columns='equal'>
          <Grid.Row>
            <Grid.Column>
              <p className='slimjoe'>
                Artifex de Machina
                &copy;
              </p>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <a href="https://github.com/AnthonyHewins">
                <Icon size="big" color="black" name="github"/>
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <p className='slimjoe'>
          Quick links
        </p>

        <List>
          {props.links.map(link)}
        </List>

        <i>Of their own motion they entered the conclave of Gods on Olympus</i>
        <br/>
        <div className="slimjoe">Aristotle</div>
      </Container>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </>
  );
}

Footer.defaultProps = {
  links: [
    {name: "Polynomial regression", url: "/tools/poly-reg"},
    {name: "Feature engineering", url: "/tools/feature-engineering"},
  ],
};
