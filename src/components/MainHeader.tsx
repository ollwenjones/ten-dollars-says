import * as React from "react";
import logo from "../logo.svg";
import { Login, SessionChangeHandler } from "./Login";

// tslint:disable-next-line:no-empty-interface
export interface MainHeaderProps extends SessionChangeHandler {}

export default class MainHeader extends React.Component<MainHeaderProps, any> {
  public render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Ten Dollars Says!</h1>
        <Login onSessionChange={this.props.onSessionChange} />
      </header>
    );
  }
}
