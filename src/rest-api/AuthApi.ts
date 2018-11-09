interface ILoginJson {
  LoginUserResult: ILoginUserResult;
}

export interface ILoginUserResult {
  DisplayType: number;
  SessionValue: string;
  StudioPortal: boolean;
}

/**
 * Auth and session related API calls.
 */
export const AuthApi = {
  login: (userId: string, password: string) =>
    new Promise<string>((resolve, reject) =>
      fetch(
        `/Primary/REST/AccountService/LoginUser?userid=${userId}&password=${password}&outputType=JSON`
      )
        .then(response =>
          response.json().then((json: ILoginJson) => {
            AuthApi.sessionId = json.LoginUserResult.SessionValue;
            resolve(json.LoginUserResult.SessionValue);
          })
        )
        .catch(reason => {
          reject(reason);
        })
    ),
  sessionId: ""
};

export const sessionIdSelector = (loginResult: ILoginUserResult) =>
  loginResult.SessionValue;
