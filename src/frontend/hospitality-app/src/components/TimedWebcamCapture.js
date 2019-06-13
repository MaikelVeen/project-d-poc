import React from "react";
import Webcam from "react-webcam";
import indicator from "../assets/indicator.png";
import { Link } from "react-router-dom";
import finished from "../assets/finis.mp3";
import Sound from "react-sound";
import { Segment, Icon, Button, Header, Dimmer } from "semantic-ui-react";
class TimedWebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      message: "",
      capture: false,
      height: window.innerHeight,
      width: window.innerWidth,
      open: false,
      response: false,
      play: Sound.status.STOPPED
    };
  }

  //set 1 second timerout for webcam start-up
  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ capture: true });
      }.bind(this),
      2000
    );
  }

  // capture photo every time capture == true
  componentDidUpdate() {
    if (this.state.capture === true) {
      this.capture();
    }
  }
  componentWillUnmount() {}

  setRef = webcam => {
    this.webcam = webcam;
  };

  //Capture photo and send request, stop calling capture
  capture = () => {
    const imageSource = this.webcam.getScreenshot();
    this.setState(
      {
        image: imageSource,
        capture: false
      },
      () => this.send_request()
    );
  };

  //send post request to backend, after response set capture == true
  send_request = () => {
    fetch("http://localhost:5000/door/open", {
      method: "POST",
      body: JSON.stringify({
        image_string: this.state.image.slice(23),
        room: this.props.roomNumber
      }),
      headers: { "Content-Type": "application/json" }
    }).then(
      result => {
        result.json().then(data => {
          this.setState(
            {
              response: true,
              open: data.valid,
              play: Sound.status.PLAYING
            }    
          );
          console.log(data.valid)
        });
      },
      error => {
        this.setState({
          message: error,
          capture: false
        });
      }
    );
  };

  render() {
    const videoConstraints = {
      width: this.state.width,
      height: this.state.height,
      facingMode: "user"
    };

    return (
      <>
        <Dimmer bl active={this.state.response}>
          {this.state.open ? (
            <div>
              <Sound
                url={finished}
                playStatus={this.state.play}
                autoLoad

              />
              <Segment inverted>
                <Header content="Door Open" />
                Welcome
              </Segment>
              <Link to="/">
                <Button animated>
                  <Button.Content visible>Go back</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Segment inverted>
                <Header content="Rejected" />
                This is not your room
              </Segment>
              <Link to="/">
                <Button animated>
                  <Button.Content visible>Go back</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Link>
            </div>
          )}
        </Dimmer>
        <div
          style={{
            // backgroundColor:'black'
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
        >
          <div
            id="webcam"
            style={{
              zIndex: 0,
              position: "absolute",
              backgroundColor: "black"
            }}
          >
            <Webcam
              audio={false}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{
                transform: "rotateY(180deg)",
                minHeight: this.state.height,
                minWidth: this.state.width
              }}
            />
          </div>

          <img
            src={indicator}
            alt=""
            style={{
              zIndex: 1,
              position: "absolute"
            }}
          />
        </div>
      </>
    );
  }
}
export default TimedWebcamCapture;
