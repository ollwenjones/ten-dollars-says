import * as React from "react";
import "./App.css";
import { Login } from "./components/Login";
import logo from "./logo.svg";

interface AppState {
  isGoodSession: boolean;
}

class App extends React.Component<{}, AppState> {
  onSessionChange = (isGoodSession: boolean) =>
    this.setState({ isGoodSession });

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ten Dollars Says!</h1>
        </header>
        <section className="App-content">
          <Login onSessionChange={this.onSessionChange} />
        </section>
      </div>
    );
  }
}

export default App;
