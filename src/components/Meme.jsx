import React, { Component } from "react";
import Character from "./Character";
import CharImage from "./CharImage";
import Quote from "./Quote";

class Meme extends Component {
  state = {};
  render() {
    return (
      <div className="meme-container">
        <div className="flex">
          {this.props.quote.characterDirection === "Left" ? (
            <>
              <CharImage
                src={this.props.quote.image}
                alt={`${this.props.quote.character} character`}
              />
              <Quote quote={this.props.quote.quote} />
            </>
          ) : (
            <>
              <Quote quote={this.props.quote.quote} />

              <CharImage
                src={this.props.quote.image}
                alt={`${this.props.quote.character} character`}
              />
            </>
          )}
        </div>
        <Character character={this.props.quote.character} />
      </div>
    );
  }
}

export default Meme;
