import React from 'react';
import HotelMenu from '../components/Menu';
import WebcamCapture from '../components/WebcamCapture'
import { LayersManager, Layer } from 'react-layers-manager'
import indicator from '../assets/indicator.png'



class CheckIn extends React.Component {

  render() {
    return (
      <>
      <header className="App-header">
        <HotelMenu />
      </header>
      <LayersManager>
          <div style={{ zIndex: 3, position: "absolute" }} id="ref1">
            <WebcamCapture />
          </div>
          <img id="ref2" style={{ zIndex: 5, position: "absolute", top: 1 }} src={indicator} />
      </LayersManager>
</>
    );
  }
}

export default CheckIn;
