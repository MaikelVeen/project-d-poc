import React from 'react';
import {Link} from  'react-router-dom';
import { 
  Grid,
  Card,
  Icon,
  Header,
  Button,
  Segment
} from 'semantic-ui-react'

export class Lobby extends React.Component {

  render() {
    return (
      <div>
        <Grid centered columns={4} relaxed='very'>
          <Grid.Row>
            <MainHeader/>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Segment 
              // basic color='green' inverted tertiary raised
              >
                <WithReservation/>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment 
              // color='blue' inverted tertiary raised
              >
                <WithoutReservation/>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const MainHeader = () => (
  <div style = {{marginBottom:'1em'}}>
    <Header as='h2'>
      <Icon name='id badge' />
      <Header.Content>
        Welcome
        <Header.Subheader>Self check-in system</Header.Subheader>
      </Header.Content>
    </Header>
  </div>
)

const WithReservation = () => {
  return (
    <Link link to='/check-in'>
      <Card raised>
        <Card.Content>
          <Card.Header>With reservation</Card.Header>
          <Card.Meta>
            <span>Pre-booked</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content description = {description} style = {CardStyle}/>
        <Card.Content extra>
          <Button animated basic color='green' fluid>
        <Button.Content visible>Check-in</Button.Content>
        <Button.Content hidden>Enter</Button.Content>
      </Button>
        </Card.Content>
      </Card>
    </Link>
  )
}
const WithoutReservation = () => {
  return (
    <Link link to='/reservation'>
      <Card raised>
        <Card.Content>
          <Card.Header>Without reservation</Card.Header>
          <Card.Meta>
            <span>Walk-in guest</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content description = {description} style = {CardStyle}/>
        <Card.Content extra>
          <Button animated basic color='blue' fluid>
        <Button.Content visible>Register</Button.Content>
        <Button.Content hidden>Enter</Button.Content>
      </Button>
        </Card.Content>
      </Card>
    </Link>
  )
}

const CardStyle = {
  minHeight : '15em',
  maxHeight : '15em'
}

// Todo: describe requirements
const description = [
  'Hendrerit Aliquet gravida, nisl donec nam blandit mollis vehicula auctor purus, ligula dui cum phasellus venenatis tortor fringilla lectus risus fames lacinia parturient, magnis amet vestibulum rhoncus molestie imperdiet at.'
]