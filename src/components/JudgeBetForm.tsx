import * as React from "react";
import {
  Bet,
  getBetDescription,
  getBetId,
  getBetName,
  getBetParties
} from "src/rest-api/Bet";
import { BetsApi } from "src/rest-api/BetsApi";
import { JudgeBetPayload } from "src/rest-api/JudgeBet";
import { Party } from "src/rest-api/Party";
import Modal from "./Modal";
import PartyCheckbox from "./PartyCheckbox";

export interface JudgeBetFormProps {
  bet?: Bet;
  onDone: () => void;
}
export interface JudgeBetFormState {
  winners: Map<string, boolean>;
}

const defaultState: JudgeBetFormState = {
  winners: new Map()
};

export default class JudgeBetForm extends React.Component<
  JudgeBetFormProps,
  JudgeBetFormState
> {
  state = { ...defaultState };

  getModel = (): JudgeBetPayload => {
    if (!this.props.bet) {
      return {
        betId: "",
        selectedWinners: []
      };
    }
    const selectedWinners: string[] = [];
    this.state.winners.forEach((won, name) => {
      if (won) {
        selectedWinners.push(name);
      }
    });
    return {
      betId: getBetId(this.props.bet),
      selectedWinners
    };
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    BetsApi.judgeBet(this.getModel())
      .then(this.props.onDone)
      .catch(this.props.onDone);

    // TODO loader during async action
  };

  onChoseWinner = (party: Party, winning: boolean) => {
    this.setState(prevState => {
      const winners = new Map(prevState.winners);
      winners.set(party.PartyName, winning);
      return { winners };
    });
  };

  isChecked = (party: Party) => !!this.state.winners.get(party.PartyName);

  getChoices = () =>
    this.props.bet
      ? getBetParties(this.props.bet).map(party => (
          <PartyCheckbox
            key={party.PartyName}
            party={party}
            onChange={this.onChoseWinner}
            checked={this.isChecked(party)}
          />
        ))
      : null;

  public render() {
    return this.props.bet ? (
      <Modal isOpen={true} onRequestClose={this.props.onDone}>
        <h3 className="modal__title">
          Judge Bet "{getBetName(this.props.bet)}"
        </h3>
        <form className="create-bet-form modal__form" onSubmit={this.onSubmit}>
          <div>{getBetDescription(this.props.bet)}</div>
          {this.getChoices()}
          <div className="modal__buttons">
            <button className="inverse" onClick={this.props.onDone}>
              Cancel
            </button>
            <button type="submit">Declare Winner(s)</button>
          </div>
        </form>
      </Modal>
    ) : null;
  }
}
