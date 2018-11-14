import * as React from "react";
import "./Bets.css";
import CompletedBets from "./CompletedBets";
import OpenBets from "./OpenBets";

// tslint:disable-next-line:no-empty-interface
export interface BetsProps {}

export default class Bets extends React.Component<BetsProps, any> {
  public render() {
    return (
      <div className="tds-bets">
        <OpenBets />
        <CompletedBets />
      </div>
    );
  }
}
