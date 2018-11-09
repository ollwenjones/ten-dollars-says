import * as React from "react";
import { AuthApi } from "src/rest-api/AuthApi";
import "./Login.css";

export interface LoginProps {
  onSessionChange: (isGoodSession: boolean) => void;
}

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

  onLogin = (e: React.FormEvent) => {
    e.preventDefault(); // keep default from refreshing the page.
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

  disableSubmission = () => !this.state.userId || !this.state.password;

  public render() {
    return (
      <form className="tds-login" onSubmit={this.onLogin}>
        <div className="input">
          <span className="label">User ID:</span>
          <input
            placeholder="User ID"
            onChange={this.onUserIdChange}
            value={this.state.userId}
          />
        </div>
        <div className="input">
          <span className="label">Password:</span>
          <input
            placeholder="Password"
            onChange={this.onPasswordChange}
            value={this.state.password}
            type="password"
          />
        </div>
        <button
          className="button"
          onClick={this.onLogin}
          disabled={this.disableSubmission()}
        >
          Login
        </button>
      </form>
    );
  }
}
