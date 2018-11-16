import * as React from "react";
import { Party } from "src/rest-api/Party";
import "./BettingParties.css";
import PartyFields from "./PartyFields";

export interface BettingPartiesProps {
  parties: Party[];
  onPartyUpdate: (index: number, party: Party) => void;
  onAddParty: () => void;
}

export default class BettingParties extends React.Component<
  BettingPartiesProps,
  any
> {
  getPartyRows = () =>
    this.props.parties.map((party, index) => (
      <PartyFields
        party={party}
        index={index}
        onChange={this.props.onPartyUpdate}
      />
    ));

  onAddParty = () => this.props.onAddParty();

  public render() {
    return (
      <div className="bettingParties">
        {this.getPartyRows()}
        <button
          className="bettingParties__add"
          type="button"
          onClick={this.onAddParty}
        >
          +
        </button>
      </div>
    );
  }
}
