import React from "react";
import Webcam from "react-webcam";
import "../App.css";
import { LayersManager } from "react-layers-manager";
import indicator from "../assets/indicator.png";

class TimedWebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: "", message: "",  fetch: true };
  }


  componentDidMount() {
   if (this.state.fetch == true){this.capture()}
  }

  componentWillUnmount() {
    
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    
    const imageSource = this.webcam.getScreenshot();
    this.setState(
      {
        image: imageSource,
        fetch: false
      },
      () => this.send_request()
    );
  };

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
          fetch: true

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
      facingMode: "user"
    };

    return (
      <>
        <div>
          <LayersManager>
            <div style={{ zIndex: 1, position: "absolute" }} id="webcam">
              <Webcam
                audio={false}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                height="720"
                width="1280"
              />

              <img
                id="indicator"
                style={{ zIndex: 2, position: "absolute", top: 1 }}
                src={indicator}
              />
            </div>
          </LayersManager>
        </div>
        <div id="text">{this.state.image}</div>
      </>
    );
  }
}
export default TimedWebcamCapture;
