import React from 'react';
import { Icon, Container, List, Message, Label, Item, Header } from 'semantic-ui-react';

type Profile = {
  bio?: React.Component;
  skills?: { icon?: string; content: string; color: string }[];
  socialInfo?: { content: string; icon: string; color: string; url: string }[];
  profile?: string;
};

const defaultProfilePicture = 'https://avatars1.githubusercontent.com/u/17508132?s=460&v=4';
const defaultSocial = [
  { content: 'Indeed', icon: 'info', color: 'blue', url: 'https://my.indeed.com/p/anthonyh-5n8375w' },
  { content: 'GitHub', icon: 'github', color: 'black', url: 'https://github.com/AnthonyHewins' },
  { content: 'LinkedIn', icon: 'linkedin', color: 'blue', url: 'https://www.linkedin.com/in/anthonyhewins' },
];
const defaultSkills = [
  { icon: 'google', content: 'Golang', color: 'blue' },
  { icon: 'firefox', content: 'Rust', color: 'brown' },
  { icon: 'react', content: 'ReactJS', color: 'teal' },
  { icon: 'linux', content: 'GNU/Linux', color: 'black' },
  { icon: 'gem', content: 'Ruby', color: 'red' },
];
const defaultBio = (
  <>
    <Header>
      <Header.Content className="weak">Quick bio</Header.Content>
    </Header>

    <p>
      Originally someone diving headfirst into the mathematics/science fields, I took a detour with a computer science
      degree from Oakland University trying to anticipate the future, knowing technology was on a path to explode in
      every direction. That was an economic decision that paid off well, but my heart is still in science and
      mathematics. My career has been full stack engineering and cybersecurity despite this. Right after graduation,
      I&apos;ve spent a considerable amount of time reading books and taking online courses in machine learning and
      probability/statistics, trying to bridge the gap between what I would have learned getting a second B.S. in
      another STEM field. My interests are incredibly wide if that isn&apos;t obvious by now. As a matter of fact, if
      money wasn&apos;t a factor, I would probably spend the rest of my life accumulating degrees and pushing human
      knowledge farther out.
    </p>

    <Header>
      <Header.Content className="weak">etc.</Header.Content>
    </Header>

    <p>
      I try to read as many books as I can (and thus by principle watch less mindless TV, Netflix, etc.) and am a
      growing fan of philosophy and economics. Some of my favorites, with links:
    </p>

    <List bulleted>
      <List.Item>
        <a href="http://classics.mit.edu/Tzu/artwar.html">
          <i>Art of war</i>
        </a>
      </List.Item>
      <List.Item>
        <a href="https://sacred-texts.com/tao/taote.htm">
          <i>Tao Te Ching</i>
        </a>
      </List.Item>
      <List.Item>
        Plato&apos;s{' '}
        <a href="http://classics.mit.edu/Plato/republic.html">
          <i>Republic</i>
        </a>
      </List.Item>
      <List.Item>
        Machiavelli&apos;s{' '}
        <a href="https://www.gutenberg.org/files/1232/1232-h/1232-h.htm">
          <i>The Prince</i>
        </a>
      </List.Item>
      <List.Item>
        Bernays&apos;s{' '}
        <a href="http://www.historyisaweapon.org/defcon1/bernprop.html">
          <i>Propaganda</i>
        </a>
      </List.Item>
      <List.Item>
        <a href="https://gutenberg.org/files/3207/3207-h/3207-h.htm">
          <i>Leviathan</i>
        </a>{' '}
        (although it has been quite some time since I last read it)
      </List.Item>
    </List>

    <p>I also train Brazilian Jiu Jitsu, formerly Krav Maga and Judo (got to nikyū before a meniscus tear).</p>

    <Header>
      <Header.Content className="weak">Technology</Header.Content>
    </Header>
  </>
);

const Anthony: React.FC<Profile> = ({
  bio = defaultBio,
  skills = defaultSkills,
  socialInfo = defaultSocial,
  profile = defaultProfilePicture,
}) => {
  const label = (l) => <Label size="large" color={l.color} icon={l.icon} content={l.content} />;

  const social = (s) => (
    <List.Item>
      <a href={s.url}>{label(s)}</a>
    </List.Item>
  );

  return (
    <Container>
      <Item.Group>
        <Item>
          <Item.Image size="medium" src={profile} />

          <Item.Content>
            <Item.Header>
              <Header>
                <Header.Content className="mid">Anthony Hewins</Header.Content>
              </Header>
            </Item.Header>

            <Item.Meta className="slimjoe">Full stack and ML</Item.Meta>

            <Item.Description>
              <Message icon>
                <Icon name="info circle" color="grey" />
                <Message.Content>
                  <p>If you&apos;re looking for a professional resume/portfolio, see:</p>
                  <List horizontal>{socialInfo.map(social)}</List>
                </Message.Content>
              </Message>

              {bio}
            </Item.Description>

            <Item.Extra>{skills.map(label)}</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Container>
  );
};

export default Anthony;
