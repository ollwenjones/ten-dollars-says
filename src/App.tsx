import * as React from "react";
import "./App.css";
import MainHeader from "./components/MainHeader";

interface AppState {
  isGoodSession: boolean;
}

class App extends React.Component<{}, AppState> {
  onSessionChange = (isGoodSession: boolean) =>
    this.setState({ isGoodSession });

  public render() {
    return (
      <div className="App">
        <MainHeader onSessionChange={this.onSessionChange} />
        <section className="App-content" />
      </div>
    );
  }
}

export default App;
