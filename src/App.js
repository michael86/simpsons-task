import axios from "axios";
import React, { Component } from "react";
import Meme from "./components/Meme";
import simpsons from "./simpsons.json";

class App extends Component {
  state = {};

  async componentDidMount() {
    const data = await axios.get(
      "https://thesimpsonsquoteapi.glitch.me/quotes?count=50"
    );

    this.setState({ memes: data.data ? data.data : simpsons });
  }

  render() {
    if (!this.state.memes) {
      return (
        <>
          <h1>Loading....</h1>
        </>
      );
    }

    return (
      <>
        <div className="grid">
          {this.state.memes.map((d) => {
            return <Meme quote={d} />;
          })}
        </div>
      </>
    );
  }
}

export default App;
