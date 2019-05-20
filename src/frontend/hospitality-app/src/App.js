import React from 'react';
import './App.css';
import WebcamCapture from './components/WebcamCapture'
import { LayersManager, Layer } from 'react-layers-manager'
import indicator from './assets/indicator.png'

const SampleModal = () => (
  <Layer>
    <img id="ref2" style= {{zIndex: 2, position: "absolute", top: 0}}  src = {indicator}/>
  </Layer>
)

function App() {
  return (
    <LayersManager>,
    <div className="App">
      <header className="App-header">
      <h1>Check in</h1>

       
       
      <div style= {{zIndex: 1, position: "absolute"}} id="ref1">
              
                <WebcamCapture/>
                </div>
                <SampleModal />
              
      </header>
    </div>
      </LayersManager>
  );
}


export default App;
