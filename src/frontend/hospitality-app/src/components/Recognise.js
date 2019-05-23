import React from 'react';
import Webcam from 'react-webcam'
import '../App.css'
import { LayersManager } from 'react-layers-manager'
import indicator from '../assets/indicator.png'
import image from '../assets/image.png'
import succes from '../assets/succesful.gif'
class Recognise extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {image : "", open: false};

      }

    setRef = webcam => {
      this.webcam = webcam;
    };
    handleClick(){
        this.setState({open: true})
      }
   
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
     const isOpen = this.state.open;
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
         
    
   
         
          { isOpen ?
      <img id="ref5" style={{ zIndex: 5, position: "absolute", top: 1 }} src={succes} />
      :
      <>
      <img id="ref4" style={{ zIndex: 5, position: "absolute", top: 1 }} src={image} />
          <img id="ref2" style={{ zIndex: 5, position: "absolute", top: 1 }} src={indicator} /></>
      }
      <button onClick={this.handleClick}>Open door</button>
     
          
      
        
        </LayersManager>
        <p>{this.state.image} </p></>
      );
    }
  }
export default Recognise