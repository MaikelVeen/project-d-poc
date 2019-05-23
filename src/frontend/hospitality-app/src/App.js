import React from 'react';
import './App.css';
import WebcamCapture from './components/WebcamCapture'
import { LayersManager, Layer } from 'react-layers-manager'
import indicator from './assets/indicator.png'
import HotelMenu from './components/Menu';
import RootRouter from "./Router/RootRouter";

class App extends React.Component {

  render() {
    return (
    <RootRouter/>
     
    );
  }
}

export default App;
