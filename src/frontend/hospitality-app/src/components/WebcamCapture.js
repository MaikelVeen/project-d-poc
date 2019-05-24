import React from 'react';
import Webcam from 'react-webcam';
import '../App.css';
import { LayersManager } from 'react-layers-manager';
import indicator from '../assets/indicator.png';
import image from '../assets/image.png';

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: '', message: '' };
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSource = this.webcam.getScreenshot();
    this.setState(
      {
        image: imageSource
      },
      () => this.send_request()
    );
  };

  send_request = () => {
    fetch('http://localhost:5000/check/image', {
      method: 'POST',
      body: JSON.stringify({
        id: 'djdjdj',
        image_string: this.state.image.slice(23)
      }),
      headers: { 'Content-Type': 'application/json'}
    }).then(
      result => {
        this.setState({
          message: result
        });
      },
      error => {
        this.setState({
          message: error
        });
      }
    );
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    };

    return (
      <div>
        <LayersManager>
          <div style={{ zIndex: 3, position: 'absolute' }} id="ref1">
            <Webcam
              audio={false}
              height={720}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
            />
          </div>
          <img
            id="ref4"
            style={{ zIndex: 5, position: 'absolute', top: 1 }}
            src={image}
          />
          <img
            id="ref2"
            style={{ zIndex: 5, position: 'absolute', top: 1 }}
            src={indicator}
          />

          <button onClick={this.capture}>Capture photo</button>
        </LayersManager>
      </div>
    );
  }
}
export default WebcamCapture;
