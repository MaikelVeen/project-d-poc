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
    console.log(props)
    this.state = { 
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
      width: this.props.online ? this.state.width : '100%',
      height: this.props.online ? this.state.height : '100%',
      facingMode: 'user'
    }; 

    return (
      <div 
      style = {{
        // backgroundColor:'black'
      }}
      >
        <Container>
          <div 
            style={!this.props.online ? null :{
              display: 'flex',  
              justifyContent:'center', 
              alignItems:'center', 
              height: '100vh'
            }}
          >
            <div 
              style = {{
                zIndex: '0',
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
                    minHeight: this.state.height,
                    minWidth:  this.state.width,
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
              src={image}
              alt =''
              style={
                this.props.online ? 
                { 
                  zIndex: 1, 
                  position: 'absolute',
                  minHeight: window.innerHeight,
                  minWidth:window.innerWidth
                } : 
                {
                  zIndex: 1, 
                  position: 'absolute',
                  width: '90%',
                  height: '360px',
                  marginLeft: '2.25%',
                  marginTop: '-34%'
                }
              }
            />

            <img
              src={indicator}
              alt=''
              style={this.props.online ?{ 
                zIndex: 2, 
                position: 'absolute',
                paddingLeft:'5%',
                paddingBottom:'15%',
                } : {
                  zIndex: 2, 
                  position: 'absolute',
                  marginLeft:'30.75%',
                  marginTop:'-20%',
                  width: '200px'
                }
              }
            />

            {this.props.online ? 
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
              : null
            } 
          </div>
        </Container>
      </div>
    );
  }
}
export default WebcamCapture;
