import * as React from "react";
import Bets from "./Bets";
import Highlights from "./HighLights";
import { LeaderBoard } from "./LeaderBoard";
import { SessionObserver } from "./Login";
import "./MainContents.css";

// tslint:disable-next-line:no-empty-interface // prefer to leave these to add to later. Prop aggregation.
export interface MainContentsProps extends SessionObserver {}

export interface MainContentsState {
  newBetName: string;
  creatingBet: boolean;
}

export default class MainContents extends React.Component<
  MainContentsProps,
  MainContentsState
> {
  state = { newBetName: "", creatingBet: true };

  onCreateBet = () => this.setState({ creatingBet: true });

  onCreateBetDone = () => this.setState({ creatingBet: false });

  onNewBetNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ newBetName: e.target.value });

  public render() {
    return (
      this.props.isGoodSession && (
        <section className="main-contents">
          <div className="main-contents__stats">
            <Highlights />
            <LeaderBoard />
          </div>
          <Bets />
        </section>
      )
    );
  }
}
