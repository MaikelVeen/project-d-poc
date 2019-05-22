import React from 'react';
import Webcam from 'react-webcam'
import '../App.css'
import { LayersManager } from 'react-layers-manager'
import indicator from '../assets/indicator.png'
import image from '../assets/image.png'
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
        <LayersManager>
       
       
        
          <div style={{ zIndex: 3, position: "absolute" }} id="ref1">
          <Webcam
           
            audio={false}
            height={720}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          />
           </div>
          <img id="ref4" style={{ zIndex: 5, position: "absolute", top: 1 }} src={image} />
          <img id="ref2" style={{ zIndex: 5, position: "absolute", top: 1 }} src={indicator} />
    
   
          <button onClick={this.capture}>Capture photo</button>
         
          
      
        
        </LayersManager>
        <p>{this.state.image} </p></>
      );
    }
  }
export default WebcamCapture