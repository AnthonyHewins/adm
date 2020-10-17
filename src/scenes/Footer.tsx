import React from 'react';
import { List, Grid, Icon, Container, Divider } from 'semantic-ui-react';
import { Link } from '@reach/router';

type FooterProps = {
  links?: { name: string; url: string }[];
};

const defaultLinks = [
  { name: 'Polynomial regression', url: '/tools/poly-reg' },
  { name: 'Feature engineering', url: '/tools/feature-engineering' },
];

const Footer: React.FC<FooterProps> = ({ links = defaultLinks }) => {
  const link = (link) => (
    <List.Item key={link.url} as={Link} to={link.url}>
      {link.name}
    </List.Item>
  );

  return (
    <>
      <Divider />
      <Container>
        <Grid padded="vertically" columns="equal">
          <Grid.Row>
            <Grid.Column>
              <p className="slimjoe">Artifex de Machina &copy;</p>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <a href="https://github.com/AnthonyHewins">
                <Icon size="big" color="black" name="github" />
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <p className="slimjoe">Quick links</p>

        <List>{links.map(link)}</List>

        <i>Of their own motion they entered the conclave of Gods on Olympus</i>
        <br />
        <div className="slimjoe">Aristotle</div>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Footer;
