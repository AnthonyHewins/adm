import React from 'react';
import {Header, Table, Container, Icon} from 'semantic-ui-react';

export const Contact = props => {
  const emailEntry = (entry) => {
    const mailto = (
      "mailto:" +
        entry.email +
        (entry.subject !== undefined && ('?subject=' + entry.subject.toString()))
    );

    return (
      <Table.Row key={entry.email}>
        <Table.Cell>
          {entry.title}
        </Table.Cell>

        <Table.Cell>
          <a href={mailto}>{entry.email}</a>
        </Table.Cell>
      </Table.Row>
    );
  };

  const githubEntry = (entry) => {
    let secondCell;
    if (entry.isRepo) {
      secondCell = (
        <a href={entry.link + "/issues/new"}>
          New issue
        </a>
      );
    } else if (entry.profile != undefined){
      secondCell = (
        <a href={entry.profile}>
          Profile
        </a>
      );
    }

    return (
      <Table.Row key={entry.email}>
        <Table.Cell>
          <a href={entry.link}>{entry.name}</a>
        </Table.Cell>

        <Table.Cell>
          {entry.desc}
        </Table.Cell>

        <Table.Cell>
          {secondCell}
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <>
      <Header as="h1" textAlign='center'>
        <Header.Content className='strong'>
          Contact
        </Header.Content>
      </Header>

      <Container textAlign='center'>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="slimjoe" colspan={2}>
                <Icon name='mail'/> Emails
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.emailEntries.map(entry => emailEntry(entry))}
          </Table.Body>
        </Table>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="slimjoe" colspan={3}>
                <Icon name='github'/> GitHub
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.githubEntries.map(entry => githubEntry(entry))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
};

Contact.defaultProps = {
  emailEntries: [
    {
      email: "adm@airmail.cc",
      title: "Business email",
      subject: "Referral from ADM",
    },
    {
      email: "aah@disroot.org",
      title: "Dev email",
      subject: "Referral from ADM",
    },
  ],
  githubEntries: [
    {
      name: "AnthonyHewins",
      link: "https://github.com/AnthonyHewins",
      desc: "Founder",
      profile: "/contact/anthony",
    },
    {
      name: "polyfit",
      link: "https://github.com/AnthonyHewins/polyfit",
      desc: "Repo for the polynomial regression tool",
      isRepo: true,
    },
    {
      name: "adm-backend",
      link: "https://github.com/AnthonyHewins/adm-backend",
      desc: "Controller code for this website",
      isRepo: true,
    },
    {
      name: "adm",
      link: "https://github.com/AnthonyHewins/adm",
      desc: "React code for this website",
      isRepo: true,
    },
    {
      name: "feature-scaling",
      link: "https://github.com/AnthonyHewins/feature-scaling",
      desc: "Repo for the feature scaling tool",
      isRepo: true,
    },
  ],
};
