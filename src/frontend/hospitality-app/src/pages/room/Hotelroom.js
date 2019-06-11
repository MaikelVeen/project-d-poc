import React from "react";
import {Room} from '../../components/Room.js';
import TimedWebcamCapture from '../../components/TimedWebcamCapture.js';

export class Hotelroom extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chosen: false, roomNumber: 0, rooms: [1, 2, 3, 4, 5, 6] };
    this.ChooseRoom = this.ChooseRoom.bind(this);
  }

  // componentDidMount() {
  //   this.request_rooms();
  // }

  // request_rooms = () => {
  //   fetch("http://localhost:5000/check/rooms")
  //   .then(
  //     result => {
  //       this.setState({
  //        rooms: result,
  //       });
  //     },
  //     error => {
  //       this.setState({
  //         message: error,
  //       });
  //     }
  //   );
  // };

  ChooseRoom(e) {
    this.setState({ chosen: true, roomNumber: e });
  }
  render() {
    const Chosen = this.state.chosen;
    return (
      <>
        <header className="App-header">
        </header>
        { Chosen ? (
            <TimedWebcamCapture roomNumber={this.state.roomNumber} />
            ) : (
                <a onClick={() => this.ChooseRoom(this.state.rooms)}>
                    <Room number={this.state.rooms} />
                </a>
            )
        }
      </>
    );
  }
}