import React, { Component } from 'react';
import { render } from 'react-dom';
import '../styles/main.css';

class App extends Component {

  render() {
    return(
      <div>Hello World</div>
    );
  }
}

render(<App />, document.getElementById('app'));