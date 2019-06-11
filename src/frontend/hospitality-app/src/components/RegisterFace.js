import React from 'react';
import {Layout} from '../Layout.js';
import WebcamCapture from './WebcamCapture.js'
import { 
    Grid,
    Segment,
    Header,
    Icon,
    Button,
    Divider,
    Container,
    Step
  } from 'semantic-ui-react'

export class RegisterFace extends React.Component {
  constructor(props) {
    super(props);
    let prevData = props.history.location.state;
    this.state = {
        data: prevData
    };
    console.log(prevData)
  }
  
  handleSubmit = () => {
    // TODO:'Send image to the back-end'
    this.props.history.push(
      '/confirm-registration', 
      { 
      data:this.state.data,
      photo: true
    }) 
  }

  handleReturn = () => {
    this.props.history.push(
      '/reservation', { data: this.state.data}
    )
  }
  render () {
      return (
          <Layout>
            <Segment>
              <StepsBar/>
              <Divider/>
              <Grid>
                <Grid.Row columns={2} centered>
                    <Grid.Column>
                      <SegmentBox
                        handle = {this.handleSubmit.bind(this)}
                        return = {this.handleReturn.bind(this)}
                      />           
                    </Grid.Column>
                    <Grid.Column>
                        <Segment placeholder style = {{minHeight: '380px'}}>
                          <WebcamCapture online = {false} />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Layout>
      )
  }
}

const SegmentBox = props => (
    <Container fluid textAlign='center'>
      <Segment placeholder style = {{minHeight: '380px'}}>
        <Header icon as ='h2'>
          <Icon name='camera' />
          Face scanner
        </Header>
        <p>
          Scan your face to register for keyless entry. 
        </p>
          <Button color='blue' content='Take picture' icon='camera' labelPosition='left' onClick = {props.handle}/>
        <Divider horizontal>Or</Divider>
          <Button color='red' content='Go back' icon='undo' labelPosition='left' onClick={props.return}/>
      </Segment>
    </Container>
  )

  const StepsBar = () => (
    <div style = {{margin: '0 0 2em 0'}}>
      <Step.Group stackable='tablet'>
        <Step disabled>
          <Icon name='address card' />
          <Step.Content>
            <Step.Title>Personal Information</Step.Title>
            <Step.Description>Enter personal information</Step.Description>
          </Step.Content>
        </Step>
  
        <Step active>
          <Icon name='camera' />
          <Step.Content>
            <Step.Title>Scan your face</Step.Title>
            <Step.Description>Scan your face for keyless entry</Step.Description>
          </Step.Content>
        </Step>
  
        <Step disabled>
          <Icon name='info circle' />
          <Step.Content>
            <Step.Title>Confirm Registration</Step.Title>
            <Step.Description>Verify Registration details</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    </div>
  )