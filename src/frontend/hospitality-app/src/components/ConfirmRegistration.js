import React from 'react';
import {Layout} from '../Layout.js';
import { Link } from 'react-router-dom';
import {
    Segment,
    Step,
    Icon,
    Divider,
    Card,
    Image,
    Grid,
    List,
    Button,
    Header
} from 'semantic-ui-react';

export class ConfirmRegistration extends React.Component {
    constructor(props) {
        super(props);
        let prevData = props.history.location.state;
        this.state = {
            data: prevData
        };
        console.log(prevData)
    }

    handleSubmit = () => {
        this.props.history.push(
          '/reservation', 
          {
              data: this.state.data
        //   firstName: this.state.data.firstName,
        //   lastName: this.state.data.lastName,
        //   tel: this.state.data.tel,
        //   email: this.state.data.email
            }
        )
      }

    render() {
        return (
            <Layout>
                <Segment style={{ backgroundColor: 'transparent' , minHeight:500}} >
                    <StepsBar />
                    <Divider />
                    <Grid columns={3} stackable textAlign='center' centered style = {{marginTop:'3em'}}>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>
                                {/* TODO: create user in the database */}
                                <Approve handle={this.handleSubmit.bind(this)}/>
                            </Grid.Column>

                            <Grid.Column>
                                <OverviewCard data={this.state.data}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Layout>
        )
    }
}

const StepsBar = () => (
    <div style={{ margin: '0 0 2em 0' }}>
        <Step.Group stackable='tablet'>
            <Step disabled>
                <Icon name='address card' />
                <Step.Content>
                    <Step.Title>Personal Information</Step.Title>
                    <Step.Description>Enter personal information</Step.Description>
                </Step.Content>
            </Step>

            <Step active>
                <Icon name='info circle' />
                <Step.Content>
                    <Step.Title>Confirm Registration</Step.Title>
                    <Step.Description>Verify Registration details</Step.Description>
                </Step.Content>
            </Step>
        </Step.Group>
    </div>
)

const OverviewCard = props => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card.Group>
            <Card raised>
                <Card.Content>
                    <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                    <Card.Header>{props.data.firstName} {props.data.lastName}</Card.Header>
                    <Card.Meta>Guest User</Card.Meta>
                    <Card.Description>
                        <br />
                        The following <strong>contact details</strong> are specified:
                </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <List relaxed='very'>
                        <List.Item>
                            <List.Icon
                                name='mail'
                                size='large'
                                verticalAlign='middle'
                                color='blue'
                            />
                            <List.Content>
                                <List.Header as='a'>E-mail</List.Header>
                                <List.Description>
                                    {props.data.email}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon
                                name='phone'
                                size='large'
                                verticalAlign='middle'
                                color='blue'
                            />
                            <List.Content>
                                <List.Header as='a'>Cellphone number</List.Header>
                                <List.Description>
                                    {props.data.tel}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                        {/* <List.Item>
                            <Label color='red' horizontal>
                            <Icon name='phone' /> Call 
                            </Label>
                            {props.data.tel}
                        </List.Item>     */}
                    </List>
                </Card.Content>
            </Card>
        </Card.Group>
    </div>
)
const Approve = props => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Segment textAlign='center'>
            <Header as='h3'>
                Personal information
                <Header.Subheader>
                    Please check your contact details.
                </Header.Subheader>
                <Header.Subheader>
                    Confirm when contact details are correct.
                </Header.Subheader>
            </Header>

            {/* TODO: OnClick method to post*/}
            <Link link to='/'>
                <Button animated='fade' color='blue'>
                    <Button.Content visible color><Icon name='signup' /> Register</Button.Content>
                    <Button.Content hidden>Confirm</Button.Content>
                </Button>
            </Link>
            <Divider horizontal>Or</Divider>
            {/* TODO: OnClick method to edit*/}
            {/* <Link link to='/'> */}
                <Button animated='fade' color='red' onClick={props.handle}>
                    <Button.Content visible color><Icon name='signup' /> Edit</Button.Content>
                    <Button.Content hidden>Change</Button.Content>
                </Button>
            {/* </Link> */}

        </Segment>
    </div>
)