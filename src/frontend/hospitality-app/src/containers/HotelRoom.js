import React from 'react';
import HotelMenu from '../components/Menu';
import TimedWebcamCapture from '../components/TimedWebcamCapture';


class HotelRoom extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {open : false, QRScanner: true , width: 0, height: 0};
  }

  render() {
    return (
     <>
      <header className="App-header">
        <HotelMenu />
      </header>
     <TimedWebcamCapture />
     </>
    );
  }
}

export default HotelRoom;
