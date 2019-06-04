import React from "react";
import QrReader from "react-qr-reader";
import "../App.css";

import WebcamCapture from "./WebcamCapture";

class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { result: "No result", QRScanner: true , width: 0, height: 0};
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
        QRScanner: false
      });
    }
  };
  handleError = err => {
    console.error(err);
  };

  render() {
    const isQrEnabled = this.state.QRScanner
    return (
      <div>
        {isQrEnabled ? 
        <div id="QRscanner">
          
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ height: '100vh', width: '100vh' }}
            
          />
           
        </div>
        : <WebcamCapture/> }

       
      </div>
    );
  }
}
export default QRScanner;
