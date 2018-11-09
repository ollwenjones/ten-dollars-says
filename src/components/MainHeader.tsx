import * as React from "react";
import logo from "../logo.svg";
import { Login, SessionChangeHandler } from "./Login";
import "./MainHeader.css";

// tslint:disable-next-line:no-empty-interface
export interface MainHeaderProps extends SessionChangeHandler {}

export default class MainHeader extends React.Component<MainHeaderProps, any> {
  public render() {
    return (
      <header className="tds-header">
        <img src={logo} className="tds-header__logo" alt="logo" />
        <h1 className="tds-header__title">Ten Dollars Says...</h1>
        <div className="tds-header__controls" />
        <Login onSessionChange={this.props.onSessionChange} />
      </header>
    );
  }
}
