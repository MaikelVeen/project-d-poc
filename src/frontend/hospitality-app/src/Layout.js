import React from "react";
import { Container } from "semantic-ui-react";

export const Layout = ({ children }) => {
  const sx = {
    paddingTop: "10em",
    paddingBottom: "2em"
  };

  return <Container style={sx}>{children}</Container>;
};
