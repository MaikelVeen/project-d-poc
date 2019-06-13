import React from "react";
import { Room } from "../../components/Room.js";
import TimedWebcamCapture from "../../components/TimedWebcamCapture.js";
import { Grid, Image } from 'semantic-ui-react'
export class Hotelroom extends React.Component {
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
        result.json().then(data => {
          this.setState(
            {
              rooms: data.result
            },)
            console.log(this.state.rooms)
          }
        )
        
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
        <header className="App-header"></header>
        <Grid columns={4 } >
        <Grid.Row centered >
        {Chosen ? (
          
          <TimedWebcamCapture roomNumber={this.state.roomNumber} />
        
        ) : (
          
          this.state.rooms.map( i => (
            <Grid.Column style={{marginLeft: "5em"}} >
            <a key = {i}onClick={() => this.ChooseRoom(i)}>
              <Room number={i} />
              </a>
              </Grid.Column>
          ))
        )}
          </Grid.Row>
      </Grid>
      </>
    );
  }
}
