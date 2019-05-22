import React from 'react';
import './App.css';
import WebcamCapture from './components/WebcamCapture'
import { LayersManager, Layer } from 'react-layers-manager'
import indicator from './assets/indicator.png'
import HotelMenu from './components/Menu';


class App extends React.Component {

  render() {
    return (
      <LayersManager>
        <div className="App">
          <header className="App-header">
            <HotelMenu />
          </header>
          <div style={{ zIndex: 3, position: "absolute" }} id="ref1">
            <WebcamCapture />
          </div>
          <img id="ref2" style={{ zIndex: 5, position: "absolute", top: 1 }} src={indicator} />
        </div>
      </LayersManager>

    );
  }
}

export default App;
