import * as React from "react";
import "./BetKickoff.css";

export interface BetKickoffProps {
  onBetNameChange: (name: string) => void;
  onCreateBet: () => void;
  newBetName: string;
}

export class BetKickoff extends React.Component<BetKickoffProps, {}> {
  onCreateBet = () => this.props.onCreateBet();

  onNewBetNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onBetNameChange(e.target.value);

  public render() {
    return (
      <div className="bet-kickoff">
        <input
          placeholder="make your bet, and"
          className="bet-kickoff-name"
          onChange={this.onNewBetNameChange}
          value={this.props.newBetName}
        />
        <button className="create-bet-btn" onClick={this.onCreateBet}>
          Throw Down!
        </button>
      </div>
    );
  }
}
