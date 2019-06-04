import React from 'react';
import HotelMenu from '../components/Menu';
import WebcamCapture from '../components/WebcamCapture';


class HotelRoom extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {open : false, QRScanner: true , width: 0, height: 0};
  }

  render() {
    const isOpen = this.state.open;
    return (
     <>
      <header className="App-header">
        <HotelMenu />
      </header>
     <WebcamCapture />
     </>
    );
  }
}

export default HotelRoom;
