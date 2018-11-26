import * as React from "react";
import "./App.css";
import CreateBetForm from "./components/CreateBetForm";
import MainContents from "./components/MainContents";
import MainHeader from "./components/MainHeader";

interface AppState {
  isGoodSession: boolean;
  newBetName: string;
  creatingBet: boolean;
}

const defaultAppState: AppState = {
  creatingBet: false,
  isGoodSession: false,
  newBetName: ""
};

class App extends React.Component<{}, AppState> {
  state = { ...defaultAppState };

  onSessionChange = (isGoodSession: boolean) => {
    // reset other things on logout
    const newState = isGoodSession ? { isGoodSession } : { ...defaultAppState };
    this.setState(newState);
  };

  onBetNameChange = (newBetName: string) => this.setState({ newBetName });
  onCreateBet = () => this.setState({ creatingBet: true });

  onCreateBetDone = () => this.setState({ creatingBet: false });

  public render() {
    return (
      <div className="App">
        <MainHeader
          isGoodSession={this.state.isGoodSession}
          onCreateBet={this.onCreateBet}
          newBetName={this.state.newBetName}
          onSessionChange={this.onSessionChange}
          onBetNameChange={this.onBetNameChange}
        />
        <MainContents isGoodSession={this.state.isGoodSession} />
        {this.state.creatingBet && (
          <CreateBetForm
            betName={this.state.newBetName}
            onBetNameChange={this.onBetNameChange}
            show={this.state.creatingBet}
            onDone={this.onCreateBetDone}
          />
        )}
      </div>
    );
  }
}

export default App;

/*

# Still need to

1. fetch contacts
    1. is the email thing okay? Seems like username without the email would be _preferable_
1. Judge bet checkbox bug!?!
1. Data refresh on create/judge API calls
1. Loader(s)
1. Web sockets?
1. tabbed table height CSS bug
1. Make the wins highlights _pretty_
1. Focus fields
    1. Description on create bet
    1. Party name when adding a party
    1. Add a field
1. X close to Modal(s)
*/
