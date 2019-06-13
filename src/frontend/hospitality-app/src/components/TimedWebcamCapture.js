import React from "react";
import Webcam from "react-webcam";
import indicator from "../assets/indicator.png";
import { Link } from "react-router-dom";
import finished from "../assets/finis.mp3";
import Sound from "react-sound";
import { Segment, Icon, Button, Header, Dimmer, Loader, Progress } from "semantic-ui-react";
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
      reject: false,
      response: false,
      play: Sound.status.STOPPED,
      scanning: false,
      retry: false,
      activate: true,
    };
    this.handleRetry = this.handleRetry.bind(this)
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
    if (this.state.response == true && this.state.reject == false && this.state.open == false && this.state.activate == true)
    {this.retry()}
    
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
   this.setState({scanning: true})

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
          this.setState({
            response: true,
            open: data.upper_threshold,
            reject: data.lower_threshold,
            play: Sound.status.PLAYING,
            scanning: false
          });
          console.log(data.upper_threshold );
          console.log(data.lower_threshold );
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
  retry(){
   this.setState({activate: false, retry: true})
  }
  handleRetry(){
    this.setState({retry: false, capture: true , response: false, activate: true})
  }
  render() {
    const videoConstraints = {
      width: this.state.width,
      height: this.state.height,
      facingMode: "user"
    };
    const Open = this.state.open;
    const Reject = this.state.reject;
   
    const Scanning = this.state.scanning;
    return (
      <>
        <Dimmer bl active={this.state.response}>
          {Open ? (
            <div>
              <Sound url={finished} playStatus={this.state.play} autoLoad />
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
          ): ("")}

          {Reject ?(
            <div>
              <Sound url={finished} playStatus={this.state.play} autoLoad />
              <Segment inverted>
                <Header content="Rejected" />
                You are not allowed to enter
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
          ): ("")}

          {this.state.retry ?(
             <div>
             <Sound url={finished} playStatus={this.state.play} autoLoad />
             <Segment inverted>
               <Header content="Not recognized" />
               <Button onClick={() => this.handleRetry()} animated>
                   <Button.Content visible>Retry</Button.Content>
                   <Button.Content hidden>
                     <Icon name="arrow right" />
                   </Button.Content>
                 </Button>
             </Segment>
           </div>
          ):("")}
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
          {Scanning ? (<Progress active percent={100} color = "yellow" size="tiny" style={{
              zIndex: 0,
              position: "absolute",
              marginTop: "35vh",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.5em",
              width: "40vh"
            }}>Scanning</Progress>) : ("")}
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
