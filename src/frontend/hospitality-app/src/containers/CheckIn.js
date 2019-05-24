import React from 'react';
import HotelMenu from '../components/Menu';
import WebcamCapture from '../components/WebcamCapture'



class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message : ""};
  }

  componentDidMount() {
    fetch("http://localhost:5000/check/image")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            message: result
          });
        },
        (error) => {
          this.setState({
            message: error
          });
        }
      )
  }
  render() {
    return (
      <>
      <header className="App-header">
        <HotelMenu />
      </header>
            <WebcamCapture/>
            <p>{this.state.message}</p>
</>
    );
  }
}

export default CheckIn;
