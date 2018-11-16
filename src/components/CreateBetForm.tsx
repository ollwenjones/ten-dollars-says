import { addWeeks, format } from "date-fns";
import * as React from "react";
import { AuthApi } from "src/rest-api/AuthApi";
import { BetsApi } from "src/rest-api/BetsApi";
import {
  CreatingBetPayload,
  makeCreatingBetObject
} from "src/rest-api/CreatingBet";
import {
  getBaseParties,
  getBasePartyReqFields,
  Party
} from "src/rest-api/Party";
import BettingParties from "./BettingParties";
import WrapInput from "./common/WrapInput";
import "./CreateBetForm.css";
import Modal from "./Modal";

// tslint:disable-next-line:no-empty-interface
export interface CreateBetFormProps {
  betName: string;
  show: boolean;
  onDone: () => void;
  onBetNameChange: (name: string) => void;
}

export interface CreateBetFormState {
  description: string;
  parties: Party[];
  judge: string;
  deadline: Date;
  // wager: number;
  notes: string;
}

const defaultState: CreateBetFormState = {
  deadline: new Date(),
  description: "",
  judge: "",
  notes: "",
  parties: []
  // wager: number,
};

export default class CreateBetForm extends React.Component<
  CreateBetFormProps,
  any
> {
  state = { ...defaultState };

  onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onBetNameChange(e.target.value);

  onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ description: e.target.value });

  onJudgeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ judge: e.target.value });

  onNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    this.setState({ notes: e.target.value });

  onDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ deadline: e.target.value });

  getModel = (): CreatingBetPayload =>
    makeCreatingBetObject(this.props.betName, this.state);

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    BetsApi.createBet(this.getModel())
      .then(this.props.onDone)
      .catch(this.props.onDone);

    // TODO loader during async action
  };

  onPartyUpdate = (index: number, party: Party) => {
    const parties = [...this.state.parties];
    parties[index] = party;
    this.setState({ parties });
  };

  addParty = () => {
    const parties = [...this.state.parties];
    parties.push(getBasePartyReqFields());
    this.setState({ parties });
  };

  componentDidMount() {
    this.setState({
      deadline: addWeeks(new Date(), 1),
      judge: AuthApi.getSessionUserName(),
      parties: getBaseParties(2)
    });
  }

  public render() {
    return (
      <Modal isOpen={this.props.show} onRequestClose={this.props.onDone}>
        <h3 className="modal__title">
          $10 Says...
          <input
            id="name"
            className="modal__title__input"
            type="text"
            value={this.props.betName}
            onChange={this.onNameChange}
          />
        </h3>
        <form className="create-bet-form modal__form" onSubmit={this.onSubmit}>
          <WrapInput htmlFor="desc" label="Description">
            <input
              className="create-bet-form__description"
              id="desc"
              type="text"
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </WrapInput>
          <div className="create-bet-form__row">
            <WrapInput
              htmlFor="deadline"
              label="Deadline"
              className="gutter-right"
            >
              <input
                type="date"
                value={format(this.state.deadline, "YYYY-MM-DD")}
                onChange={this.onDeadlineChange}
              />
            </WrapInput>
            <WrapInput htmlFor="judge" label="Judge" className="flex1">
              <input
                value={this.state.judge}
                onChange={this.onJudgeChange}
                className="create-bet-form__judge"
              />
            </WrapInput>
          </div>
          <BettingParties
            parties={this.state.parties}
            onPartyUpdate={this.onPartyUpdate}
            onAddParty={this.addParty}
          />
          <WrapInput htmlFor="notes" label="Notes">
            <textarea
              value={this.state.notes}
              onChange={this.onNotesChange}
              className="create-bet-form__notes"
            />
          </WrapInput>
          <div className="modal__buttons">
            <button className="inverse" onClick={this.props.onDone}>
              Cancel
            </button>
            <button type="submit">Throw down!</button>
          </div>
        </form>
      </Modal>
    );
  }
}
