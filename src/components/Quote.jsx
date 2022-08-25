import React, { Component } from "react";

class Quote extends Component {
  state = {};
  render() {
    return <p>{this.props.quote}</p>;
  }
}

export default Quote;
