import * as React from "react";
import { Bet } from "src/rest-api/Bet";
import "./Bets.css";
import Tabs from "./common/Tabs";
import CompletedBets from "./CompletedBets";
import JudgeBetForm from "./JudgeBetForm";
import OpenBets from "./OpenBets";

// tslint:disable-next-line:no-empty-interface
export interface BetsProps {}

export interface BetsState {
  judgingBet?: Bet;
}

export default class Bets extends React.Component<BetsProps, any> {
  state = { judgingBet: undefined };

  onJudgeBet = (judgingBet: Bet) => this.setState({ judgingBet });

  onDoneJudgingBet = () => this.setState({ judgingBet: undefined });

  public render() {
    return (
      <div className="tds-bets">
        <Tabs labels={["Open Bets", "Completed Bets"]}>
          <OpenBets onJudgeBet={this.onJudgeBet} />
          <CompletedBets />
        </Tabs>
        {this.state.judgingBet && (
          <JudgeBetForm
            bet={this.state.judgingBet}
            onDone={this.onDoneJudgingBet}
          />
        )}
      </div>
    );
  }
}
