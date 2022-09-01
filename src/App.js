import axios from "axios";
import React, { Component } from "react";
import Meme from "./components/Meme";
import simpsons from "./simpsons.json";
import { findMemeById } from "./utils/utils";

class App extends Component {
  state = { searchInput: "", filtered: [] };

  async componentDidMount() {
    const data = await axios.get(
      "https://thesimpsonsquoteapi.glitch.me/quotes?count=50"
    );

    data.data.forEach((element, index) => {
      element.id = index;
    });

    this.setState({ memes: data.data ? data.data : simpsons });
  }

  onDelete = (id) => {
    const copy = [...this.state.memes];
    copy.splice(findMemeById(copy, id), 1);
    this.setState({ memes: copy });
  };

  onLike = (id) => {
    const memes = [...this.state.memes];
    const index = findMemeById(memes, id);
    memes[index].liked = !memes[index].liked;
    this.setState({ memes });
  };

  countLikes = () => this.state.memes.filter((meme) => meme.liked).length;

  filterChars = (val) => {
    return [...this.state.memes].filter((meme) =>
      meme.character.toLowerCase().includes(val)
    );
  };

  onInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });

    e.target.value.length > 0 &&
      this.setState({ filtered: this.filterChars(e.target.value) });

    e.target.value.length === 0 && this.setState({ filtered: [] });
  };

  render() {
    if (!this.state.memes) {
      return (
        <>
          <h1>Loading....</h1>
        </>
      );
    }

    const data =
      this.state.filtered.length > 0 ? this.state.filtered : this.state.memes;

    return (
      <>
        <input
          type="text"
          name="searchInput"
          value={this.state.searchInput}
          onInput={this.onInput}
        />

        <h1>likes: {this.countLikes()}</h1>

        <div className="grid">
          {data.map((d) => {
            return (
              <Meme
                key={d.id}
                quote={d}
                onDelete={this.onDelete}
                onLike={this.onLike}
              />
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
