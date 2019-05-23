import React from 'react';
import HotelMenu from '../components/Menu';



class Reservation extends React.Component {

  render() {
    return (
     <>
      <header className="App-header">
        <HotelMenu />
      </header>
     <p>Reservation</p>
     </>
    );
  }
}

export default Reservation;
