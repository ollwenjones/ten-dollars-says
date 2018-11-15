import * as React from "react";
import { Party } from "src/rest-api/Party";
import WrapInput from "./common/WrapInput";
import "./CreateBetForm.css";
import Modal from "./Modal";

// tslint:disable-next-line:no-empty-interface
export interface CreateBetFormProps {
  show: boolean;
  onDone: () => void;
}

export interface CreateBetFormState {
  name: string;
  description: string;
  parties: Party[];
  judge: string;
  deadline: Date;
  // wager: number;
  notes: string;
}

export default class CreateBetForm extends React.Component<
  CreateBetFormProps,
  any
> {
  onNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ name: e.target.value });

  onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ name: e.target.value });

  onJudgeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ name: e.target.value });

  onNotesChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ name: e.target.value });

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.onDone();
  };

  public render() {
    return (
      <Modal isOpen={this.props.show} onRequestClose={this.props.onDone}>
        <h3 className="modal__title">Throw Down!</h3>
        <form className="create-bet-form modal__form">
          <WrapInput id="name" label="Name">
            <input id="name" type="text" />
          </WrapInput>
          <WrapInput id="desc" label="Description">
            <input id="desc" type="text" />
          </WrapInput>
          <WrapInput id="deadline" label="Deadline">
            <input type="datetime-local" />
          </WrapInput>
          <div className="modal__buttons">
            <button onClick={this.props.onDone}>Cancel</button>
            <button>Submit Bet</button>
          </div>
        </form>
      </Modal>
    );
  }
}
