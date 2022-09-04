import React, { Component } from "react";

class ShowLiked extends Component {
  render() {
    return (
      <>
        <header>
          <button className="toggle-likes" onClick={this.props.onShowLiked}>
            {this.props.screen === 0 ? "Show Liked" : "Hide Liked"}
          </button>
        </header>
      </>
    );
  }
}

export default ShowLiked;
