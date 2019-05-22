import React from 'react';
import Webcam from 'react-webcam'

class WebcamCapture extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {image : ""};
      }

    setRef = webcam => {
      this.webcam = webcam;
    };
   
    capture = () => {
      const imageSource = this.webcam.getScreenshot();
      this.setState({
          image : imageSource
      })
    
    }
    render() {
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
   
      return (
        <>
        <div>
          <Webcam
            audio={false}
            height={720}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
          <button onClick={this.capture}>Capture photo</button>
         
          
        </div>
        <p>{this.state.image} </p>
        </>
      );
    }
  }
export default WebcamCapture