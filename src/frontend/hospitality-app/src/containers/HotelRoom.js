import React from 'react';
import HotelMenu from '../components/Menu';

import Recognise from '../components/Recognise';


class HotelRoom extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {open : false};
  }
 
  render() {
    const isOpen = this.state.open;
    return (
     <>
      <header className="App-header">
        <HotelMenu />
      </header>
     <Recognise/>
     </>
    );
  }
}

export default HotelRoom;
