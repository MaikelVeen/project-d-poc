import React from "react";
import HotelMenu from "../components/Menu";
import Room from "../components/Room";
import TimedWebcamCapture from "../components/TimedWebcamCapture";

class HotelRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = { chosen: false , roomNumber: 0};
    this.ChooseRoom = this.ChooseRoom.bind(this)
  }

  //TODO 
  // fetch available rooms
  // map rooms
  


  ChooseRoom(e){
    this.setState({chosen: true, roomNumber: e})
  }
  render() {
    const Chosen = this.state.chosen;
    return (
      <>
        <header className="App-header">
          <HotelMenu />
        </header>

        {Chosen ? <TimedWebcamCapture roomNumber = {this.state.roomNumber}/> : 
        
        <a onClick={() => this.ChooseRoom(6)}> <Room number={6} /></a>}
      </>
    );
  }
}

export default HotelRoom;
