import * as React from "react";
import "./App.css";

import ApolloClient from 'apollo-boost'

import logo from "./logo.svg";

const client = new ApolloClient({
  uri: 'https://localhost/4000'
});


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
