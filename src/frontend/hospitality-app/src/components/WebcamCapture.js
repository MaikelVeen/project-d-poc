import React from 'react';
import Webcam from 'react-webcam';
import indicator from '../assets/indicator.png';
import image from '../assets/image.png';
import {
  Container,
  Button
} from 'semantic-ui-react';

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
      width: window.innerWidth,
      height: window.innerHeight,
      facingMode: 'user'
    };  

    return (
      <div style = {{backgroundColor:'black'}}>
        <Container>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <div style = {{zIndex: '0',position:'absolute'}}
            >
              <Webcam
                audio={false}
                ref={this.setRef}
                screenshotFormat='image/jpeg'
                videoConstraints={videoConstraints}
                style = {{
                  transform: 'rotateY(180deg)',
                  minHeight: window.innerHeight,
                  minWidth:  window.innerWidth
                }}
              />
            </div>

            <img
              src={image}
              alt =''
              style={{ 
                zIndex: 1, 
                position: 'absolute',
                minHeight:'100vh',
                minWidth:'100vw'
              }}
            />

            <img
              src={indicator}
              alt=''
              style={{ 
                zIndex: 2, 
                position: 'absolute',
                paddingLeft:'5%',
                paddingBottom:'15%'
              }}
            />

            <Button
              onClick = {this.capture}
              color='grey'
              icon='expand'
              label={{ 
                basic: true, 
                color: 'grey', 
                pointing: 'left', 
                content: 'Capture me' ,
              }}
              style = {{
                zIndex: 3,
                position: 'absolute',
                left: '5%',
                top:'10%'
              }}
            />

          </div>
        </Container>
      </div>
    );
  }
}
export default WebcamCapture;
