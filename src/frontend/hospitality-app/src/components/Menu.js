import React from 'react';
import SideNav from 'react-simple-sidenav';
import { FiMenu} from "react-icons/fi"
class HotelMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
    };
  }
  render() {
    return (
      <>
        <FiMenu size="1.5em" onClick={() => this.setState({ showNav: true })} />
        <SideNav
          showNav={this.state.showNav}
          onHideNav={() => this.setState({ showNav: false })}
          title          =  "Proof of concept"
          items          =  {['Reservation', 'Check-in', 'HotelRoom']}
          titleStyle     =  {{backgroundColor: '#4CAF50'}}
          itemStyle      =  {{backgroundColor: '#fff'}}
          itemHoverStyle =  {{backgroundColor: 'grey'}}
          items={[
            <p style={{color:"black"}}>Reservation</p>,
            <p style={{color:"black"}}>Check-in</p>,
            <p style={{color:"black"}}>Hotel room</p>
            ]} />
      </>
    )
  }
}
export default HotelMenu;