import React from 'react';
import { Layout } from '../../Layout.js';
import { Link } from 'react-router-dom';
import { Grid, Card, Icon, Header, Button, Segment } from 'semantic-ui-react';

export class Lobby extends React.Component {
  render() {
    return (
      <Layout>
        <Grid centered columns={4} relaxed="very">
          <Grid.Row>
            <MainHeader />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Segment>
                <WithReservation />
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <WithoutReservation />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

const MainHeader = () => (
  <div style={{ marginBottom: '1em' }}>
    <Header as="h2">
      <Icon name="id badge" />
      <Header.Content>
        Welcome
        <Header.Subheader>Self check-in system</Header.Subheader>
      </Header.Content>
    </Header>
  </div>
);

const WithReservation = () => {
  return (
    <Link link to="/check-in">
      <Card raised>
        <Card.Content>
          <Card.Header>With reservation</Card.Header>
          <Card.Meta>
            <span>Pre-booked</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content description={description} style={CardStyle} />
        <Card.Content extra>
          <Button animated basic color="green" fluid>
            <Button.Content visible>Check-in</Button.Content>
            <Button.Content hidden>Enter</Button.Content>
          </Button>
        </Card.Content>
      </Card>
    </Link>
  );
};
const WithoutReservation = () => {
  return (
    <Link link to="/reservation">
      <Card raised>
        <Card.Content>
          <Card.Header>Without reservation</Card.Header>
          <Card.Meta>
            <span>Walk-in guest</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content description={descriptionReservation} style={CardStyle} />
        <Card.Content extra>
          <Button animated basic color="blue" fluid disabled={true}>
            <Button.Content visible >Not available</Button.Content>
            <Button.Content hidden>Not available</Button.Content>
          </Button>
        </Card.Content>
      </Card>
    </Link>
  );
};

const CardStyle = {
  minHeight: '12em',
  maxHeight: '12em'
};

const description =
  'If you booked online you can scan the QR Code you have received in your inbox and check in.';

const descriptionReservation =
  'If you did not make a reservation online you can do it now and check in immediatly.';
