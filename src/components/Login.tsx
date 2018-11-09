import * as React from "react";
import { AuthApi } from "src/rest-api/AuthApi";
import "./Login.css";

export interface SessionChangeHandler {
  /**
   * This is kind of a hack to keep the app component slim,
   * but ideally this kind of state would be at the top,
   * and / or abstracted out of the component layer using some kind of
   * store/middleware. Implementing Redux or Mobx seemed a bit much for
   * this POC though.
   */
  onSessionChange: (isGoodSession: boolean) => void;
}

// tslint:disable-next-line:no-empty-interface
export interface LoginProps extends SessionChangeHandler {}

interface LoginState {
  userId: string;
  password: string;
  sessionId: string;
  error?: boolean;
}

const initialState: LoginState = {
  password: "",
  sessionId: "",
  userId: ""
};

export class Login extends React.Component<LoginProps, LoginState> {
  state = { ...initialState };

  onUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ userId: e.currentTarget.value });

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ password: e.currentTarget.value });

  onLogin = () => {
    if (this.disableSubmission()) {
      return;
    }
    AuthApi.login(this.state.userId, this.state.password)
      .then(sessionId => {
        this.setState({ sessionId });
      })
      .catch(reason => {
        this.setState({ error: true, sessionId: "" });
      });
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // keep default from refreshing the page.
    if (this.state.sessionId) {
      this.onLogout();
    } else {
      this.onLogin();
    }
  };

  onLogout = () => {
    this.setState({ sessionId: "" });
    this.props.onSessionChange(false);
  };

  disableSubmission = () => !this.state.userId || !this.state.password;

  public render() {
    return (
      <form className="tds-login" onSubmit={this.onSubmit}>
        {!this.state.sessionId ? (
          [
            <input
              key="userId"
              className="tds-login__input"
              placeholder="User ID"
              onChange={this.onUserIdChange}
              value={this.state.userId}
            />,
            <input
              key="password"
              className="tds-login__input"
              placeholder="Password"
              onChange={this.onPasswordChange}
              value={this.state.password}
              type="password"
            />,
            <button
              key="submit"
              className="tds-login__button"
              onClick={this.onLogin}
              disabled={this.disableSubmission()}
            >
              Login
            </button>
          ]
        ) : (
          <button className="tds-login__button" onClick={this.onLogout}>
            Log Out
          </button>
        )}
      </form>
    );
  }
}
