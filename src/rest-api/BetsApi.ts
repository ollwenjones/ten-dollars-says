import { AuthApi } from "./AuthApi";
import { Bet } from "./Bet";

export interface BetResult {
  Rows: Bet[]; // because everything in Decisions is Pascal case?
}

// is there a way to make these more friendly?
// are they portable? (I'm guessing they are unique per decisions instance)
const BET_OPEN_ID = "3869289d-bceb-11e8-a989-81c1bba3abd0";
const BET_COMPLETED_ID = "ef1a1fa6-b5f8-11e8-a987-c4660be71084";

export const BetsApi = {
  fetchBetsCompleted: () => getWrappedBetFetch(BET_COMPLETED_ID),
  fetchBetsOpen: () => getWrappedBetFetch(BET_OPEN_ID)
};

/* hoisted helper functions: */

function getReportUrl(reportId: string) {
  const sessionId = AuthApi.getSessionId(); // TODO escape?
  return `http://localhost/decisions/Primary/?ReportId=${reportId}&Action=api&outputtype=JSON&sessionId=${sessionId}`;
}

function getWrappedBetFetch(reportId: string) {
  return new Promise<Bet[]>((resolve, reject) =>
    fetch(getReportUrl(reportId))
      .then(
        response =>
          response.json && // 403s still trigger fetch.then!!1?
          response.json().then((json: BetResult) => {
            // tslint:disable-next-line:no-console
            console.log(json);
            resolve(json.Rows);
          })
      )
      .catch(reason => {
        reject(reason);
      })
  );
}
