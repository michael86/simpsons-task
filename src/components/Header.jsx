import React, { Component } from "react";
import ShowLiked from "./ShowLiked";

class Header extends Component {
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
  }

  state = { searchInput: "" };

  componentDidMount() {
    this.searchInput.current.focus();
  }

  onInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    e.target.value.length > 0 &&
      this.props.setFiltered(this.props.filterChars(e.target.value));
  };

  render() {
    return (
      <>
        <div className="flex flex-col">
          <input
            type="text"
            name="searchInput"
            value={this.state.searchInput}
            onInput={this.onInput}
            ref={this.searchInput}
          />

          {this.props.liked.length > 0 && (
            <ShowLiked
              onShowLiked={this.props.onShowLiked}
              screen={this.props.screen}
            />
          )}
        </div>
      </>
    );
  }
}

export default Header;
