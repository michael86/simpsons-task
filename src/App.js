import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Meme from "./components/Meme";
import ShowLiked from "./components/ShowLiked";
import simpsons from "./simpsons.json";
import { findMemeById, deleteFromArray } from "./utils/utils";

class App extends Component {
  state = { filtered: [], liked: [], screen: 0 };

  async componentDidMount() {
    const data = await axios.get(
      "https://thesimpsonsquoteapi.glitch.me/quotes?count=50"
    );

    data.data.forEach((element, index) => {
      element.id = index;
    });

    this.setState({ memes: data.data ? data.data : simpsons });
  }

  //Iterate over each state array and delete the relevant index
  onDelete = (id) => {
    this.setState({ memes: deleteFromArray(this.state.memes, id) });

    this.state.filtered.length > 0 &&
      this.setState({
        filtered: deleteFromArray(this.state.filtered, id),
      });

    this.state.liked.length > 0 &&
      this.setState({ liked: deleteFromArray(this.state.liked, id) }, () => {
        /*This call back was to prevent a couple of sneaky bugs.

        Firstly, we have to wait for the state to finish updating to check the new status. 

        Secondly, if the user deleted all there likes, then we should just switch back to the main screen.
        Otherwise the toggle button would vanish and prevent the user from being able to switch back to screen 0
       */
        this.state.liked.length === 0 &&
          this.state.screen === 1 &&
          this.setState({ screen: 0 });
      });
  };

  //This is called from header when user input is detected
  setFiltered = (filtered) => this.setState({ filtered });

  filterChars = (val) => {
    return [...this.state.memes].filter((meme) =>
      meme.character.toLowerCase().includes(val)
    );
  };

  //Triggered from Meme.jsx
  onLike = (id) => {
    //Was going to create a util to manage these two, but they both do different things, so nested functions it is.
    const updateMemes = () => {
      const memes = [...this.state.memes];
      const index = findMemeById(memes, id);
      memes[index].liked = !memes[index].liked;
      this.setState({ memes });
    };

    const updateLiked = () => {
      const liked = [...this.state.liked];
      liked.includes(id) ? liked.splice(liked.indexOf(id), 1) : liked.push(id);
      this.setState({ liked });
    };

    updateMemes();
    updateLiked();
  };

  countLikes = () => this.state.memes.filter((meme) => meme.liked).length;

  onShowLiked = () => {
    this.setState({ screen: this.state.screen === 0 ? 1 : 0 }, () => {
      /*Another sneaky bug: 
      if the user had input a filter and then switched to screen 1 (liked), upon switching back to screen 0,
      it would only show the last memes from filtered state without the input box having the search term
      applied. 
      
      So clear filtered. Ideally, we could save the last search term to state and then refilter based on that.
      However... It's Sunday, so quick easy fix :) */
      this.state.screen === 1 && this.setState({ filtered: [] });
    });
  };

  render() {
    if (!this.state.memes) {
      return (
        <div className="loading-container">
          <h1>Loading....</h1>
          <img
            src={require("./imgs/spinner.png")}
            className="loading-image"
            alt="Loading spinner"
          />
        </div>
      );
    }

    // Check if screen is zero, otherwise if user has filtered, it wont show liked when liked clicked on.
    const data =
      this.state.screen === 0 && this.state.filtered.length > 0
        ? this.state.filtered
        : this.state.memes;

    return this.state.screen === 0 ? (
      <>
        <Header
          liked={this.state.liked}
          filterChars={this.filterChars}
          setFiltered={this.setFiltered}
          screen={this.state.screen}
          onShowLiked={this.onShowLiked}
        />

        <h1>likes: {this.countLikes()}</h1>

        <main className="grid">
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
        </main>
      </>
    ) : (
      <>
        <ShowLiked onShowLiked={this.onShowLiked} screen={this.state.screen} />
        <main className="grid">
          {data.map((d) => {
            return (
              d.liked && (
                <Meme
                  key={d.id}
                  quote={d}
                  onDelete={this.onDelete}
                  onLike={this.onLike}
                />
              )
            );
          })}
        </main>
      </>
    );
  }
}

export default App;
