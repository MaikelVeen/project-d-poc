import React from "react";
import TimedWebcamCapture from "../components/TimedWebcamCapture";
import "../App.css";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: props.number };
  }
  render() {
    return (
        <div id="Room">Hotel Room {this.state.number}</div>
    );
  }
}

export default Room;
