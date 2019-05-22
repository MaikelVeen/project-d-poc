import React from 'react';
import SideNav from 'react-simple-sidenav';
import { FiMenu } from "react-icons/fi"
import { Link } from "react-router-dom";
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
          title="Proof of concept"
          items={['Reservation', 'Check-in', 'HotelRoom']}
          titleStyle={{ backgroundColor: '#4CAF50' }}
          itemStyle={{ backgroundColor: '#fff' }}
          itemHoverStyle={{ backgroundColor: 'grey' }}
          items={[
            <Link style={{ textDecoration: 'none' }} to={`/home`}>
              <p style={{ color: "black" }}>Reservation</p>
            </Link>,
            <Link style={{ textDecoration: 'none' }} to={`/checkin`}>
              <p style={{ color: "black" }}>Check-in</p>
            </Link>,
            <Link style={{ textDecoration: 'none' }} to={`/hotelroom`}>
              <p style={{ color: "black" }}>Hotel room</p></Link>
          ]} />
      </>
    )
  }
}
export default HotelMenu;