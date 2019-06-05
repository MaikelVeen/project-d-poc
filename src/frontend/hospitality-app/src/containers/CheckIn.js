import React from "react";
import HotelMenu from "../components/Menu";
import WebcamCapture from "../components/WebcamCapture";
import QRScanner from "../components/QRScanner";

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "", qr: true };
  }

  render() {
    const isQrEnabled = this.state.qr;
    return (
      <>
        <header className="App-header">
          <HotelMenu />
        </header>
        {/* {isQrEnabled ? <QRScanner /> : <WebcamCapture />} */}
        <QRScanner/>
      </>
    );
  }
}

export default CheckIn;
