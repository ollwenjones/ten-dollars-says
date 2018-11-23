import * as React from "react";
import { HighlightsApi, WinnerInfo } from "src/rest-api/HighlightsApi";
import {
  UpdateSubscriber,
  UpdateSubscriptions
} from "src/rest-api/UpdateSubscriptions";
import muscle from "../img/muscle.svg";
import WinsTile from "./WinsTile";

export interface MostWinsProps extends React.HTMLProps<{}> {
  title?: string;
  icon?: string;
  fetchMethod?: () => Promise<WinnerInfo>;
}

export interface MostWinsState {
  who: string;
  score: string;
}

export default class MostWins
  extends React.Component<MostWinsProps, MostWinsState>
  implements UpdateSubscriber {
  state = { who: "", score: "" };

  updateModel() {
    const fetchInfo = this.props.fetchMethod || HighlightsApi.fetchMostWins;
    fetchInfo()
      .then(info => this.setState({ who: info.name, score: info.score }))
      .catch(reason => this.setState({ who: "Nobody?", score: "" }));
  }

  componentDidMount() {
    this.updateModel();
    UpdateSubscriptions.addSubscriber(this.props.title || "Most Wins", this);
  }

  componentWillUnmount() {
    UpdateSubscriptions.removeSubscriber(this.props.title || "Most Wins");
  }

  public render() {
    return (
      <WinsTile
        title={this.props.title || "Most Wins"}
        icon={this.props.icon || muscle}
        score={this.state.score}
      >
        {this.state.who}
      </WinsTile>
    );
  }
}
