import {
  getFlowAliasUrl,
  getFlowIdUrl,
  getReportUrl,
  getResponseJson
} from "./ApiHelpers";
import { Bet } from "./Bet";
import { CreatingBetPayload } from "./CreatingBet";
import { JudgeBetPayload } from "./JudgeBet";

export interface BetResult {
  result: {
    bets: Bet[];
  };
}

// is there a way to make these more friendly?
// are they portable? (I'm guessing they are unique per decisions instance)
const BET_ALIAS = "tds/bets";
const PARTY_REPORT = "56ccdda8-bda2-11e8-a989-81c1bba3abd0";

export const BetsApi = {
  createBet: (newBet: CreatingBetPayload) => {
    const url = getFlowIdUrl("f5aef800-b2c8-11e8-a987-c4660be71084");
    return fetch(url, {
      body: JSON.stringify(newBet),
      method: "POST",
      mode: "cors"
    });
  },
  fetchBetsCompleted: () => getWrappedBetFetch(true),
  fetchBetsOpen: () => getWrappedBetFetch(false),
  fetchPartyReport: () =>
    new Promise<any[]>((resolve, reject) =>
      fetch(getReportUrl(PARTY_REPORT), { mode: "cors" })
        .then(response =>
          getResponseJson(response, (json: any) => resolve(json.Rows), reject)
        )
        .catch(reason => {
          reject(reason);
        })
    ),
  judgeBet: (judgeBet: JudgeBetPayload) => {
    const url = getFlowAliasUrl("tds/judge");
    return fetch(url, {
      body: JSON.stringify(judgeBet),
      method: "POST",
      mode: "cors"
    });
  }
};

/* hoisted helper functions: */

function getWrappedBetFetch(completed: boolean) {
  return new Promise<Bet[]>((resolve, reject) => {
    const url = getFlowAliasUrl(BET_ALIAS) + `&completed=${completed}`;
    return fetch(url, {
      mode: "cors"
    })
      .then(response =>
        getResponseJson(
          response,
          (json: BetResult) => resolve(json.result.bets),
          reject
        )
      )
      .catch(reason => {
        reject(reason);
      });
  });
}
