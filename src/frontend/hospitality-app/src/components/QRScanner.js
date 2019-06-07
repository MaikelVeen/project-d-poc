import React from 'react';
import QrReader from 'react-qr-reader';
import '../App.css';

import WebcamCapture from './WebcamCapture';

class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scannedData: '',
      error: '',
      codeValid: false,
      scannerEnabled: true,
      webcamEnabled: false
    };
  }

  handleScan = data => {
    if (data) {
      this.setState(
        {
          scannedData: data
        },
        () => this.check_qrcode()
      );
    }
  };

  handleError = err => {
    console.error(err);
    this.setState({
      error: 'QR code not recognized.'
    });
  };

  check_qrcode = () => {
    fetch('http://localhost:5000/check/qr', {
      method: 'POST',
      body: JSON.stringify({
        id: this.state.scannedData
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then(
      result => {
        result.json().then(data => {
          this.setState(
            {
              codeValid: data.valid
            },
            () => this.qrcheck_callback()
          );
        });
      },
      error => {
        this.setState({
          message: error
        });
      }
    );
  };

  qrcheck_callback = () => {
    if(this.state.codeValid === true){
      this.setState({...this.state, scannerEnabled:false,webcamEnabled:true})
    }
  };

  render() {
    const scannerEnabled = this.state.scannerEnabled;
    const webcamEnabled = this.state.webcamEnabled;

    return (
      <div>
        {scannerEnabled ? (
          <div id="QRscanner">
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ height: '100vh', width: '100vh' }}
            />
            <p>{this.state.error}</p>
          </div>
        ) : (
          ''
        )}
        {webcamEnabled ? (
          <div>
            <WebcamCapture id={this.state.scannedData}/>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
export default QRScanner;
