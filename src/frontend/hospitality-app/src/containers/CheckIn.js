import React from 'react';
import HotelMenu from '../components/Menu';
import WebcamCapture from '../components/WebcamCapture'



class CheckIn extends React.Component {

  render() {
    return (
      <>
      <header className="App-header">
        <HotelMenu />
      </header>
            <WebcamCapture/>
</>
    );
  }
}

export default CheckIn;
