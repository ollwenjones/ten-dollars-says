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
import { UpdateSubscriptions } from "src/rest-api/UpdateSubscriptions";
import BettingParties from "./BettingParties";
import { Loader } from "./common/Loader";
import SearchField from "./common/SearchField";
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
  busy: boolean;
  description: string;
  parties: Party[];
  judge: string;
  deadline: Date;
  // wager: number;
  notes: string;
}

const defaultState: CreateBetFormState = {
  busy: false,
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

  onChoseJudge = (judge: string) => this.setState({ judge });

  onNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    this.setState({ notes: e.target.value });

  onDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ deadline: e.target.value });

  getModel = (): CreatingBetPayload =>
    makeCreatingBetObject(this.props.betName, this.state);

  onSubmit = (e: React.FormEvent) => {
    this.setState({ busy: true });
    e.preventDefault();
    BetsApi.createBet(this.getModel())
      .then(() => {
        UpdateSubscriptions.triggerUpdate();
        this.setState({ busy: false });
        this.props.onDone();
      })
      .catch(() => {
        this.setState({ busy: false });
        this.props.onDone();
      });
  };

  focusDescription = (element: HTMLInputElement) => element && element.focus();

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

  disableSubmitButton = () => {
    const emptyParty = !!this.state.parties.filter(
      party => !party.PartyName || !party.Position
    ).length;

    return (
      !this.props.betName ||
      emptyParty ||
      !this.state.deadline ||
      !this.state.judge
    );
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
              key="desc"
              type="text"
              value={this.state.description}
              onChange={this.onDescriptionChange}
              ref={this.focusDescription}
            />
          </WrapInput>
          <div className="create-bet-form__row">
            <WrapInput
              htmlFor="deadline"
              label="Deadline"
              className="gutter-right"
              required={true}
            >
              <input
                type="date"
                value={format(this.state.deadline, "YYYY-MM-DD")}
                onChange={this.onDeadlineChange}
              />
            </WrapInput>
            <SearchField
              label="Judge"
              onChoseValue={this.onChoseJudge}
              inputClassName="create-bet-form__judge"
              placeholder="Judge"
              required={true}
              value={this.state.judge}
            />
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
            <button type="submit" disabled={this.disableSubmitButton()}>
              Throw down!
            </button>
          </div>
        </form>
        <Loader busy={this.state.busy} />
      </Modal>
    );
  }
}
