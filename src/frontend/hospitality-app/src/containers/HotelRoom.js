import React from "react";
import HotelMenu from "../components/Menu";
import Room from "../components/Room";
import TimedWebcamCapture from "../components/TimedWebcamCapture";

class HotelRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chosen: false, roomNumber: 0, rooms: [] };
    this.ChooseRoom = this.ChooseRoom.bind(this);
  }

  componentDidMount() {
    this.request_rooms();
  }

  request_rooms = () => {
    fetch("http://localhost:5000/door/numbers")
    .then(
      result => {
        this.setState({
         rooms: result,
        });
      },
      error => {
        this.setState({
          message: error,
        });
      }
    );
  };

  ChooseRoom(e) {
    this.setState({ chosen: true, roomNumber: e });
  }
  render() {
    const Chosen = this.state.chosen;
    return (
      <>
        <header className="App-header">
          <HotelMenu />
        </header>
        {Chosen ? (
          <TimedWebcamCapture roomNumber={this.state.roomNumber} />
        ) : (
          this.state.rooms.map(i => (
            <a onClick={() => this.ChooseRoom(i)}>
              <Room number={i} />
              {this.state.rooms}
            </a>
          ))
        )}
      </>
    );
  }
}
<div id="Room">Hotel Room {i}</div>
export default HotelRoom;
