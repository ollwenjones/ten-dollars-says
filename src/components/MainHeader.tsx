import * as React from "react";
import logo from "../logo.svg";
import { BetKickoff, BetKickoffProps } from "./BetKickoff";
import { Login, SessionChangeHandler, SessionObserver } from "./Login";
import "./MainHeader.css";

// tslint:disable-next-line:no-empty-interface
export interface MainHeaderProps
  extends SessionChangeHandler,
    SessionObserver,
    BetKickoffProps {}

export default class MainHeader extends React.Component<MainHeaderProps, any> {
  public render() {
    return (
      <header className="tds-header">
        <img src={logo} className="tds-header__logo" alt="logo" />
        <h1 className="tds-header__title">Ten Dollars Says...</h1>
        <div className="tds-header__controls">
          {this.props.isGoodSession && <BetKickoff {...this.props} />}
        </div>
        <Login onSessionChange={this.props.onSessionChange} />
      </header>
    );
  }
}
