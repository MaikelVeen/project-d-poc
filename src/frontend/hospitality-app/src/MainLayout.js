import React from 'react';
import logo from './assets/background3.png';
import {Link} from  'react-router-dom';
import {
    Container,
    Menu,
    Segment,
    Sidebar,
    Icon,
    Button,
    Label,
    Image
  } from 'semantic-ui-react'
import './MainLayout.css';

export class MainLayout extends React.Component {
  state = {
    animation: 'push',
    direction: 'left',
    dimmed: true,
    visible: false
  }

  handleMenuChange = () => this.setState(prevState => ({ visible: !prevState.checked }))

  handleSidebarHide = () => this.setState({ visible: false })

    render () {
      const { dimmed, visible } = this.state
        return (
          <div style = {{overflow:'hidden'}} >
            <MenuBar push = {this.handleMenuChange.bind(this)}/>

            <div style = {SideBarStyle}>
              <Sidebar.Pushable as={Segment}>
                <SideMenu 
                visible = {visible} 
                handle = {this.handleSidebarHide.bind(this)}
                />
                <Sidebar.Pusher dimmed = {dimmed && visible} >
                  <div id = 'bg'>
                    <Container style ={ContainerStyle}>
                      {this.props.children}
                    </Container> 
                  </div>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </div>
          </div>
        )
    }
}

const MenuBar = props => {
  const MenuStyle = {
    minHeight: '4em',
    maxHeight: '4em',
  }
  return (
    <Menu 
    fixed = 'top' 
    inverted 
    style = {MenuStyle}
    borderless
    >
      <Menu.Item position = 'left'>
        <Button onClick={props.push} icon='list' inverted></Button>
      </Menu.Item>
      <Menu.Item header position = 'right' >
          <Label color='red' ribbon>
            Concept
          </Label>
          
          <span style = {{fontSize:18}}>
            <i>Groep 2</i>
            </span>
          {/* <Icon circular name='group' size='big'/> */}
          <Image 
          src={logo} 
          spaced='right'
          style={{
            maxHeight:'2em', 
            marginLeft:'1em'
          }} />
      </Menu.Item>
    </Menu>
  )
}
const SideMenu = props => {
  return(
    <Sidebar
    as={Menu}
    animation='push'
    direction='left'
    icon='labeled'
    inverted
    vertical
    visible={props.visible}
    width='thin'
    onHide={props.handle}
  >
    <Link to='/reservation'>
      <Menu.Item>
        <Icon name='computer'/>
        Reservation
      </Menu.Item>
    </Link>
    <Link to='/lobby'>
      <Menu.Item>
        <Icon name='id badge outline' />
        Check-in
      </Menu.Item>
    </Link>
    <Link to='/hotelroom'>
      <Menu.Item>
        <Icon name='user'/>
        Hotel room
      </Menu.Item>
    </Link>
  </Sidebar>
  )
}

const SideBarStyle = {
  // minHeight: window.innerHeight - 64,
  // maxHeight: window.innerHeight - 64,
  marginTop:'4em',
}

const ContainerStyle = {
  paddingTop:'10em', 
  paddingBottom: '2em', 
  minHeight: window.innerHeight - 64,
}