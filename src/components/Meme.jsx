// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import Character from "./Character";
import CharImage from "./CharImage";
import Quote from "./Quote";

class Meme extends Component {
  render() {
    const { quote, character, image, characterDirection, liked, id } = {
      ...this.props.quote,
    };

    return (
      <div className={`meme-container ${liked ? "liked" : ""}`}>
        <div className="flex">
          {characterDirection === "Left" ? (
            <>
              <CharImage src={image} alt={`${character} character`} />
              <Quote quote={quote} />
            </>
          ) : (
            <>
              <Quote quote={quote} />
              <CharImage src={image} alt={`${character} character`} />
            </>
          )}
        </div>
        <Character character={character} />

        <div className="btn-container">
          <button
            onClick={() => {
              this.props.onLike(id);
            }}
          >
            {liked ? "Unlike" : "Like"}
          </button>
          <button
            onClick={() => {
              this.props.onDelete(id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Meme;
