import * as React from "react";
import "./App.css";
import CreateBetForm from "./components/CreateBetForm";
import MainContents from "./components/MainContents";
import MainHeader from "./components/MainHeader";

interface AppState {
  isGoodSession: boolean;
  creatingBet: boolean;
}

class App extends React.Component<{}, AppState> {
  state = { isGoodSession: false, creatingBet: true };

  onSessionChange = (isGoodSession: boolean) => {
    this.setState({ isGoodSession });
  };

  onCreateBet = () => this.setState({ creatingBet: true });

  onCreateBetDone = () => this.setState({ creatingBet: false });

  public render() {
    return (
      <div className="App">
        <MainHeader onSessionChange={this.onSessionChange} />
        <MainContents
          isGoodSession={this.state.isGoodSession}
          onCreateBet={this.onCreateBet}
        />
        <CreateBetForm
          show={this.state.creatingBet}
          onDone={this.onCreateBetDone}
        />
      </div>
    );
  }
}

export default App;

/*

# Still need to

1. fetch contacts
1. create bet
*/
