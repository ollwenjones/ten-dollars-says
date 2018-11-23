import * as React from "react";
import { Party } from "src/rest-api/Party";
import "./PartyCheckbox.css";

export interface PartyCheckboxProps {
  party: Party;
  checked: boolean;
  onChange: (party: Party, selected: boolean) => void;
}

export default class PartyCheckbox extends React.Component<
  PartyCheckboxProps,
  any
> {
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.props.onChange(this.props.party, !this.props.checked);
  };

  public render() {
    const { party, checked } = this.props;
    return (
      <div className="party-checkbox">
        <input
          className="party-checkbox__input"
          key={party.PartyName}
          title={`Declare ${party.PartyName} winner`}
          type="checkbox"
          checked={checked}
          onChange={this.onChange}
        />
        {party.PartyName} : <em>"{party.Position}"</em>
      </div>
    );
  }
}
