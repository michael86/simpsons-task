import React, { Component } from "react";

class Character extends Component {
  state = {};
  render() {
    return <cite className="align-bottom">{this.props.character}</cite>;
  }
}

export default Character;
