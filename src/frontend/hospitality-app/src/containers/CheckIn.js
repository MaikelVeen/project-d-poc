import React from 'react';
import HotelMenu from '../components/Menu';
import WebcamCapture from '../components/WebcamCapture'



class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message : ""};
  }


  render() {
    return (
      <>
      <header className="App-header">
        <HotelMenu />
      </header>
            <WebcamCapture/>
            <p>{this.state.message}</p>
</>
    );
  }
}

export default CheckIn;
