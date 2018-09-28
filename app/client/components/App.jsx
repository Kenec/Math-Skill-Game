import React, { Component } from 'react';
import { render } from 'react-dom';
import Game from './Game';
import '../styles/main.css';

class App extends Component {

  render() {
    return (
      <div>
        <Game />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));