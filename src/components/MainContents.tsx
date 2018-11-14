import * as React from "react";
import Bets from "./Bets";
import Highlights from "./HighLights";
import { LeaderBoard } from "./LeaderBoard";
import { SessionObserver } from "./Login";
import "./MainContents.css";

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
          <div className="main-contents__stats">
            <Highlights />
            <LeaderBoard />
          </div>
          <Bets />
        </section>
      )
    );
  }
}
