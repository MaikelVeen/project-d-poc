import React from 'react';
import logo from '../../assets/background3.png';
import {Layout} from '../../Layout.js'
import {Link} from  'react-router-dom';
import { 
  Container,
  Header,
  Button,
  Icon,
  Segment,
  Image,
} from 'semantic-ui-react'

export class Home extends React.Component {
    displayName = Home.name
  
    render() {
      return (
        <Layout>
          <Segment
            inverted
            style={{ minHeight: 400 }}
          >
            <Image 
              src={logo} 
              size='small'
            />
            <HomepageHeading/>
          </Segment>
        </Layout>
      );
    }
}

const HomepageHeading = () => {
  return (
    <Container>
      <Header
        as='h1'
        content='Project D - Methylium'
        textAlign='center'
        inverted
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: 0,
        }}
      />    

    <Header
      as='h2'
      content='Choose demo'
      inverted
      textAlign='center'
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginTop: '1.5em',
        marginBottom: '1em',
        color: 'grey'
      }}
    />
    <ButtonMultipleDemo/>
  </Container>
  )
}

const ButtonMultipleDemo = () => {
  return (
    <div style = {{textAlign:'center'}}>
      <Link to='/online'>
        <Button basic inverted color='red'>
          <Icon name='computer' /> Reservation
        </Button>
      </Link>

      <Link to='/lobby'>
        <Button basic inverted color='green'>
          <Icon name='id badge outline' /> Check-in
        </Button>
      </Link>

      <Link to='/hotelroom'>
        <Button basic inverted color='blue'>
          <Icon name='user' /> Hotel room
        </Button>
      </Link>
    </div>
  )
}