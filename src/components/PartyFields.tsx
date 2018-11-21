import * as React from "react";
import {
  Party,
  updatePartyBetPosition,
  updatePartyName
} from "src/rest-api/Party";
import SearchField from "./common/SearchField";
import WrapInput from "./common/WrapInput";
import "./PartyFields.css";

export interface PartyFieldsProps {
  index: number;
  party: Party;
  onChange: (index: number, party: Party) => void;
}

export default class PartyFields extends React.Component<
  PartyFieldsProps,
  any
> {
  onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedParty = updatePartyName(e.target.value, this.props.party);
    this.props.onChange(this.props.index, updatedParty);
  };

  onChosePartyName = (name: string) => {
    const updatedParty = updatePartyName(name, this.props.party);
    this.props.onChange(this.props.index, updatedParty);
  };

  onBetPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedParty = updatePartyBetPosition(
      e.target.value,
      this.props.party
    );
    this.props.onChange(this.props.index, updatedParty);
  };

  getNameId = () => this.props.index + "_name";

  getBetPositionId = () => this.props.index + "_bet-position";

  public render() {
    return (
      <div className="party-fields">
        <SearchField
          label="Name"
          onChoseValue={this.onChosePartyName}
          inputClassName="party-fields__input"
          placeholder="Name"
          value={this.props.party.PartyName}
        />
        <WrapInput htmlFor={this.getNameId()} label="Bets that">
          <input
            className="party-fields__input"
            placeholder="Bets that"
            onChange={this.onBetPositionChange}
          />
        </WrapInput>
      </div>
    );
  }
}
