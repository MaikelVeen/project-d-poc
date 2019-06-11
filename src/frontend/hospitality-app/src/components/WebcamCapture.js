import React from 'react';
import Webcam from 'react-webcam';
import indicator from '../assets/indicator.png';
import {
  Container,
  Button,
  Icon
} from 'semantic-ui-react';

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = { 
      id: props.id,
      image: '', 
      message: '',
      height: window.innerHeight,
      width: window.innerWidth,
    };
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
        id: this.state.id,
        image_string: this.state.image.slice(23)
      }),
      headers: { 'Content-Type': 'application/json' }
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
      width: '100%',
      height: '100%',
      facingMode: 'user'
    }; 

    return (
      <div 
      style = {{
        backgroundColor:'black'
      }}
      >
        <Container>
          <div >
            <div 
              style = {{
                zIndex: 0,
                position:'absolute'
              }}
            >
              <Webcam
                audio={false}
                ref={this.setRef}
                screenshotFormat='image/jpeg'
                videoConstraints={videoConstraints}
                style = { 
                  this.props.online ?{
                    transform: 'rotateY(180deg)',
                    height: '100%', 
                    width: '100%',
                    marginLeft: '3.5%',
                  } : {
                    transform: 'rotateY(180deg)',
                    height: '90%', 
                    width: '90%',
                    marginLeft: '3.5%',
                    marginTop: '-34%'
                  }
                }
              />
            </div>

            <img
              src={indicator}
              alt=''
              style={this.props.online ?{ 
                zIndex: 2, 
                position: 'absolute',
                marginLeft:'35%',
                marginTop:'10%',
                width: '200px'
                } : {
                  zIndex: 2, 
                  position: 'absolute',
                  marginLeft:'30.75%',
                  marginTop:'-20%',
                  width: '200px'
                }
              }
            />

          <div
            style = {{
              zIndex: 3,
              position:'absolute',
              left: '-62%',
              marginTop:'30%'
            }}
          >
            <Button animated='fade' primary onClick={this.send_request.bind(this)}>
              <Button.Content visible>Capture picture</Button.Content>
              <Button.Content hidden>
                <Icon name = 'camera'/> Save
              </Button.Content>
            </Button>
          </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default WebcamCapture;
