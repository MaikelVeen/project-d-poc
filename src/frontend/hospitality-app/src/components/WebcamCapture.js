import React from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import indicator from '../assets/indicator.png';
import {
  Container,
  Button,
  Icon,
  Dimmer,
  Header,
  Segment
} from 'semantic-ui-react';

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      id: props.id,
      image: '',
      message: '',
      height: window.innerHeight,
      width: window.innerWidth,
      active: false,
      disableCaptureButton: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ disableCaptureButton: false });
    }, 2000);
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
    this.props.online
      ? this.setState({ active: true })
      : this.setState({ active: false });

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
    if (!this.props.online) this.props.handle();
  };

  render() {
    const videoConstraints = {
      width: '100%',
      height: '100%',
      facingMode: 'user'
    };

    return (
      <div
        style={{
          backgroundColor: 'black'
        }}
      >
        <Dimmer active={this.state.active} page>
          <div>
            <Segment inverted>
              <Header content="Status" />
              Your check-in was successful.
            </Segment>
            <Link to="/lobby">
              <Button animated>
                <Button.Content visible>Next</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Link>
          </div>
        </Dimmer>
        <Container>
          <div>
            <div
              style={{
                zIndex: 0,
                position: 'absolute'
              }}
            >
              <Webcam
                audio={false}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={
                  this.props.online
                    ? {
                        transform: 'rotateY(180deg)',
                        height: '100%',
                        width: '100%',
                        marginLeft: '3.5%'
                      }
                    : {
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
              alt=""
              style={
                this.props.online
                  ? {
                      zIndex: 2,
                      position: 'absolute',
                      marginLeft: '35%',
                      marginTop: '10%',
                      width: '200px'
                    }
                  : {
                      zIndex: 2,
                      position: 'absolute',
                      marginLeft: '30.75%',
                      marginTop: '-20%',
                      width: '200px'
                    }
              }
            />
            <div
              style={
                this.props.online
                  ? {
                      zIndex: 3,
                      position: 'absolute',
                      left: '-62%',
                      marginTop: '30%'
                    }
                  : {
                      zIndex: 3,
                      position: 'absolute',
                      left: '-69%',
                      marginTop: '4%'
                    }
              }
            >
              <Button animated="fade" primary onClick={this.capture.bind(this)} disabled={this.state.disableCaptureButton}>
                <Button.Content visible>Capture picture</Button.Content>
                <Button.Content hidden>
                  <Icon name="camera" /> Save
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
