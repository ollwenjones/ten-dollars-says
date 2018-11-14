import * as React from "react";
import { TileFlowApi, WinnerInfo } from "src/rest-api/TileFlowApi";
import WinsTile from "./WinsTile";

export interface MostWinsProps extends React.HTMLProps<{}> {
  title?: string;
  fetchMethod?: () => Promise<WinnerInfo>;
}

export interface MostWinsState {
  who: string;
}

export default class MostWins extends React.Component<
  MostWinsProps,
  MostWinsState
> {
  state = { who: "" };

  componentDidMount() {
    const fetchInfo = this.props.fetchMethod || TileFlowApi.fetchMostWins;
    fetchInfo()
      .then(info => this.setState({ who: info.value }))
      .catch(reason => this.setState({ who: "Nobody?" }));
  }

  public render() {
    return (
      <WinsTile title={this.props.title || "Most Wins"}>
        {this.state.who}
      </WinsTile>
    );
  }
}
