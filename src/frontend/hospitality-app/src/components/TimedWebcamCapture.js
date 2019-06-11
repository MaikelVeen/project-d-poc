import React from "react";
import Webcam from "react-webcam";
import indicator from "../assets/indicator.png";

class TimedWebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      image: "", 
      message: "", 
      capture: false,
      height: window.innerHeight,
      width: window.innerWidth
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
    fetch("http://localhost:5000/check/image", {
      method: "POST",
      body: JSON.stringify({
        id: "djdjdj",
        image_string: this.state.image.slice(23)
      }),
      headers: { "Content-Type": "application/json" }
    }).then(
      result => {
        this.setState({
          message: result,
          capture: true
        });
      },
      error => {
        this.setState({
          message: error,
          capture: true
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
        <div style = {{
        // backgroundColor:'black'
          display: 'flex',  
          justifyContent:'center', 
          alignItems:'center', 
          height: '100vh'
        }}>
            <div
              id="webcam"
              style={{ 
                zIndex: 0, 
                position: "absolute", 
                backgroundColor:'black' 
                }}>

              <Webcam
                audio={false}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style = {{
                  transform: 'rotateY(180deg)',
                  minHeight: this.state.height,
                  minWidth:  this.state.width,
                  }}
              />
              </div>

              {/* <img
                id="indicator"
                style={{ 
                  zIndex: 2, 
                  position: "absolute", 
                  // top: 1 
                }}
                src={indicator}
                alt=''
              /> */}

              <img
              src={indicator}
              alt=''
              style={{ 
                zIndex: 1, 
                position: 'absolute',
                }
              }
            />
        </div>
       
      </>
    );
  }
}
export default TimedWebcamCapture;