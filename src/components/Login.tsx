import * as React from "react";
import { AuthApi } from "src/rest-api/AuthApi";
import "./Login.css";

export interface SessionObserver {
  isGoodSession: boolean;
}

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
  error?: boolean;
}

const initialState: LoginState = {
  password: "",
  userId: ""
};

export class Login extends React.Component<LoginProps, LoginState> {
  state = { ...initialState };

  componentDidMount() {
    // when initializing, need to notify after check.
    if (AuthApi.getSessionId()) {
      this.props.onSessionChange(true);
    }
  }

  getSessionId = () => AuthApi.getSessionId();

  onUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ userId: e.currentTarget.value });

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ password: e.currentTarget.value });

  onLogin = () => {
    if (this.disableSubmission()) {
      return;
    }
    AuthApi.login(this.state.userId, this.state.password)
      .then(id => {
        this.setState(initialState);
        this.props.onSessionChange(true);
      })
      .catch(reason => {
        this.setState({ error: true });
      });
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // keep default from refreshing the page.
    if (AuthApi.getSessionId()) {
      this.onLogout();
    } else {
      this.onLogin();
    }
  };

  onLogout = () => {
    AuthApi.logout();
    this.setState({ error: false });
    this.props.onSessionChange(false);
  };

  disableSubmission = () => !this.state.userId || !this.state.password;

  getWarning = () =>
    this.state.error && (
      <figure className="tds-login__error" key="login-error">
        Incorrect User ID or Password
      </figure>
    );

  public render() {
    const sessionId = AuthApi.getSessionId();
    return (
      <form className="tds-login" onSubmit={this.onSubmit}>
        {!sessionId ? (
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
              type="submit"
              className="tds-login__button"
              disabled={this.disableSubmission()}
            >
              Login
            </button>,
            this.getWarning()
          ]
        ) : (
          <button className="tds-login__button" type="submit">
            Log Out
          </button>
        )}
      </form>
    );
  }
}
