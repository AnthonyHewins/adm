import React from 'react'
import { Segment, Image, List, Icon, Card, Container, Header} from 'semantic-ui-react'

export interface FundProps {
    message?: React.ReactNode
}

export function Fund({message = undefined}: FundProps) {
    return (
        <Container>
            <Header as="h1" textAlign="center">
                <Header.Content className="strong">
                    Fund Your Account
                </Header.Content>
                <Header.Subheader className="slimjoe">
                    Cheap, lightning-fast API that makes you money
                </Header.Subheader>
            </Header>

            <Header as="h5">
                Get armed with knowledge before investing. Use your bitcoin to leverage our tools and increase your wealth with access to the growing platform.
            </Header>

            <Segment placeholder>
                <Header icon>
                    <Icon name='tasks' />
                    Coming soon
                </Header>
                <Segment.Inline>
                    Give it a little time.
                </Segment.Inline>
            </Segment>
        </Container>
    )
}
/*

            <List>
                <List.Item>
                    <Icon color="green" name="dollar sign" /> Fair value for ticker using DCF and machine learning
                </List.Item>
            </List>

            <Card.Group stackable={true} centered={true}>
                <Card>
                    <Image src='/images/wireframe/white-image.png' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Starter</Card.Header>
                        <Card.Meta>10 API calls</Card.Meta>
                        <Card.Description>
                            <List>
                                <List.Item>$2</List.Item>
                            </List>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Image src='/images/wireframe/white-image.png' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Mid</Card.Header>
                        <Card.Meta>25 API calls</Card.Meta>
                        <Card.Description>
                            <List>
                                <List.Item>$4</List.Item>
                            </List>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Image src='/images/wireframe/white-image.png' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>Starter</Card.Header>
                        <Card.Meta>100 API calls</Card.Meta>
                        <Card.Description>
                            <List>
                                <List.Item>$12</List.Item>
                            </List>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
*/
