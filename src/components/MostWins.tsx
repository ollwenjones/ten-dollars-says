import * as React from "react";
import { TileFlowApi, WinnerInfo } from "src/rest-api/TileFlowApi";
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
}

export default class MostWins
  extends React.Component<MostWinsProps, MostWinsState>
  implements UpdateSubscriber {
  state = { who: "" };

  updateModel() {
    const fetchInfo = this.props.fetchMethod || TileFlowApi.fetchMostWins;
    fetchInfo()
      .then(info => this.setState({ who: info.value }))
      .catch(reason => this.setState({ who: "Nobody?" }));
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
      >
        {this.state.who}
      </WinsTile>
    );
  }
}
