import { ApiConfig } from "./ApiConfig";
import {
  getReportUrl,
  getResponseJson,
  getServiceEndPointUrl
} from "./ApiHelpers";
import { Bet } from "./Bet";
import { CreatingBetPayload } from "./CreatingBet";
import { JudgeBetPayload } from "./JudgeBet";

export interface BetResult {
  GetBetsResult: {
    bets: Bet[];
  };
}

const BET_SERVICE = "TdsBetsService";
const BET_ALIAS = `${BET_SERVICE}/GetBets`;
const CREATE_BET = `${BET_SERVICE}/CreateBet`;
const JUDGE_BET = `${BET_SERVICE}/JudgeBet`;
const PARTY_REPORT = "56ccdda8-bda2-11e8-a989-81c1bba3abd0";

export const BetsApi = {
  createBet: (newBet: CreatingBetPayload) => {
    const url = getServiceEndPointUrl(CREATE_BET);
    return fetch(url, {
      body: JSON.stringify(newBet),
      method: "POST",
      mode: ApiConfig.getFetchMode()
    });
  },
  fetchBetsCompleted: () => getWrappedBetFetch(true),
  fetchBetsOpen: () => getWrappedBetFetch(false),
  fetchPartyReport: () =>
    new Promise<any[]>((resolve, reject) =>
      fetch(getReportUrl(PARTY_REPORT), { mode: ApiConfig.getFetchMode() })
        .then(response =>
          getResponseJson(response, (json: any) => resolve(json.Rows), reject)
        )
        .catch(reason => {
          reject(reason);
        })
    ),
  judgeBet: (judgeBet: JudgeBetPayload) => {
    const url = getServiceEndPointUrl(JUDGE_BET);
    return fetch(url, {
      body: JSON.stringify(judgeBet),
      method: "POST",
      mode: ApiConfig.getFetchMode()
    });
  }
};

/* hoisted helper functions: */

function getWrappedBetFetch(completed: boolean) {
  return new Promise<Bet[]>((resolve, reject) => {
    const url = getServiceEndPointUrl(BET_ALIAS) + `&completed=${completed}`;
    return fetch(url, {
      mode: ApiConfig.getFetchMode()
    })
      .then(response =>
        getResponseJson(
          response,
          (json: BetResult) => {
            return resolve(json.GetBetsResult.bets);
          },
          reject
        )
      )
      .catch(reason => {
        reject(reason);
      });
  });
}
