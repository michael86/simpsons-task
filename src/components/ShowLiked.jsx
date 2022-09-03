import React, { Component } from "react";

class ShowLiked extends Component {
  render() {
    return (
      <>
        <button className="toggle-likes" onClick={this.props.onShowLiked}>
          {this.props.screen === 0 ? "Show Liked" : "Hide Liked"}
        </button>
      </>
    );
  }
}

export default ShowLiked;
