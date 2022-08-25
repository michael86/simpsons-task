import React, { Component } from "react";

class CharImage extends Component {
  state = {};
  render() {
    return <img src={this.props.src} alt={this.props.alt} />;
  }
}

export default CharImage;
