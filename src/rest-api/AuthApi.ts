import * as Cookies from "js-cookie";

interface ILoginJson {
  LoginUserResult: ILoginUserResult;
}

export interface ILoginUserResult {
  DisplayType: number;
  SessionValue: string;
  StudioPortal: boolean;
}
// this is added in a set-cookie header, whether or not we had good creds!!:
// const SESSION_ID_COOKIE = "DecisionsSessionID";

const SESSION_ID_COOKIE = "TdsSessionId";

/**
 * Auth and session related API calls.
 */
export const AuthApi = {
  /**
   * @return the current session ID (stored in a session cookie)
   */
  getSessionId: () => Cookies.get(SESSION_ID_COOKIE),
  /**
   * Make REST call to log in.
   * @return promise that resolves the cookie.
   */
  login: (userId: string, password: string) =>
    new Promise<string>((resolve, reject) =>
      fetch(
        `/Primary/REST/AccountService/LoginUser?userid=${userId}&password=${password}&outputType=JSON`
      )
        .then(response =>
          response.json().then((json: ILoginJson) => {
            const id = sessionIdSelector(json.LoginUserResult);
            Cookies.set(SESSION_ID_COOKIE, id);
            resolve(id);
          })
        )
        .catch(reason => {
          reject(reason);
        })
    ),

  logout: () => Cookies.remove(SESSION_ID_COOKIE)
};

export const sessionIdSelector = (loginResult: ILoginUserResult) =>
  loginResult.SessionValue;
