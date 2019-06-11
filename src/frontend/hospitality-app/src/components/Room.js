import React from "react";
import { Layout } from "../Layout.js";
import { Card } from "semantic-ui-react";

export class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number
    };
  }
  render() {
    return (
      // <div id="Room">Hotel Room {this.state.number}</div>
      <Layout id="Room">
        <Card.Group itemsPerRow={3}>
          {this.state.number.map(number => (
            <MyCard number={number} />
          ))}
        </Card.Group>
      </Layout>
    );
  }
}

const MyCard = props => (
  <Card
    color="teal"
    raised
    onClick={{}}
    header="Hotelroom"
    meta={"Number " + props.number}
  />
);
