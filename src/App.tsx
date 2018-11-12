import * as React from "react";
import "./App.css";
import MainContents from "./components/MainContents";
import MainHeader from "./components/MainHeader";

interface AppState {
  isGoodSession: boolean;
}

class App extends React.Component<{}, AppState> {
  state = { isGoodSession: false };
  onSessionChange = (isGoodSession: boolean) => {
    this.setState({ isGoodSession });
  };

  public render() {
    return (
      <div className="App">
        <MainHeader onSessionChange={this.onSessionChange} />
        <MainContents isGoodSession={this.state.isGoodSession} />
      </div>
    );
  }
}

export default App;
