import React from "react";
import { Link } from "react-router-dom";
import QrReader from "react-qr-reader";
import indicator from "../assets/indicator.png";
import WebcamCapture from "./WebcamCapture";
import {
  Grid,
  Segment,
  Header,
  Icon,
  Button,
  Divider,
  Container
} from "semantic-ui-react";

export class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scannedData: "",
      error: "",
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
      error: "QR code not recognized."
    });
  };

  check_qrcode = () => {
    fetch("http://localhost:5000/check/qr", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.scannedData
      }),
      headers: { "Content-Type": "application/json" }
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
    if (this.state.codeValid === true) {
      this.setState({
        ...this.state,
        scannerEnabled: false,
        webcamEnabled: true
      });
    }
  };

  render() {
    const scannerEnabled = this.state.scannerEnabled;
    const webcamEnabled = this.state.webcamEnabled;

    return (
      <Grid>
        <Grid.Row columns={2} centered>
          <Grid.Column>
            <SegmentBox handle={scannerEnabled} />
          </Grid.Column>
          <Grid.Column>
            {scannerEnabled ? (
              <div>
                <QrReader
                  delay={300}
                  onError={this.handleError}
                  onScan={this.handleScan}
                  style={{
                    height: "100%",
                    width: "100%",
                    transform: "rotateY(180deg)",
                    zIndex: 0,
                    position: "absolute"
                  }}
                />
                <p>{this.state.error}</p>

                <img
                  src={indicator}
                  alt=""
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    marginLeft: "25%",
                    marginTop: "10%",
                    width: "300px"
                  }}
                />
              </div>
            ) : (
              ""
            )}
            {webcamEnabled ? (
              <div>
                <WebcamCapture id={this.state.scannedData} online={true} />
              </div>
            ) : (
              ""
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const SegmentBox = props => (
  <Container fluid textAlign="center">
    <Segment placeholder>
      <Header icon as="h2">
        {props.handle ? (
          <Icon name="qrcode" />
        ) : (
          <Icon name="user circle outline" />
        )}
        {props.handle ? "QR-code scanner" : "Face scanner"}
      </Header>
      {props.handle ? (
        <p>Scan the QR-code you received in your mail.</p>
      ) : (
        <div>
          <p>Place your face in front of the camera.</p>
          <br />
          <br />
          {/* <Button animated='fade' primary>
            <Button.Content visible>Capture picture</Button.Content>
            <Button.Content hidden>
              <Icon name = 'camera'/> Save
            </Button.Content>
          </Button> */}
        </div>
      )}
      <Divider horizontal>Or</Divider>
      <Link to="/lobby">
        <Button
          color="red"
          content="Go back"
          icon="undo"
          labelPosition="left"
        />
      </Link>
    </Segment>
  </Container>
);
