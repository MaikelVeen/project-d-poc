import React from "react";
import HotelMenu from "../components/Menu";
import QRScanner from "../components/QRScanner";

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: ""};
  }

  render() {
    return (
      <>
        <header className="App-header">
          <HotelMenu />
        </header>
        <QRScanner/>
      </>
    );
  }
}

export default CheckIn;
