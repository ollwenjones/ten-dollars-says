import * as React from "react";
import CompletedBets from "./CompletedBets";
import Highlights from "./HighLights";
import { SessionObserver } from "./Login";
import "./MainContents.css";
import OpenBets from "./OpenBets";
import PartyReport from "./PartyReport";

// tslint:disable-next-line:no-empty-interface // prefer to leave these to add to later. Prop aggregation.
export interface MainContentsProps extends SessionObserver {}

export default class MainContents extends React.Component<
  MainContentsProps,
  any
> {
  public render() {
    return (
      this.props.isGoodSession && (
        <section className="main-contents">
          <Highlights />
          <OpenBets />
          <CompletedBets />
          <PartyReport />
        </section>
      )
    );
  }
}
