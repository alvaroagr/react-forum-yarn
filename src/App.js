import React, { Component } from 'react';
import Router from './config/Router'
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="container">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        {Router}
      </div>
    );
  }
}

export default App;
