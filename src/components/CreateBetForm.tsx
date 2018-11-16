import { addWeeks, format } from "date-fns";
import * as React from "react";
import { Party } from "src/rest-api/Party";
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

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onDone();
    // TODO extract model
    // TODO trigger async action
    // TODO loader during async action
    // TODO close modal on success
  };

  componentDidMount() {
    this.setState({
      deadline: addWeeks(new Date(), 1)
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
        <form className="create-bet-form modal__form">
          <WrapInput htmlFor="desc" label="Description">
            <input
              className="create-bet-form__description"
              id="desc"
              type="text"
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
          </WrapInput>
          <WrapInput htmlFor="deadline" label="Deadline">
            <input
              type="date"
              value={format(this.state.deadline, "YYYY-MM-DD")}
              onChange={this.onDeadlineChange}
            />
          </WrapInput>
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
