import { getFlowAliasUrl } from "./ApiHelpers";

export const HighlightsApi = {
  fetchHighestPercent: () =>
    makeWrappedTileFetch("tds/most/percent", getPercent),
  fetchMostWins: () => makeWrappedTileFetch("tds/most/wins", getScore)
};

interface DoneSortedArray {
  Done: {
    "Sorted Array": ScoreSummary[];
  };
}

export interface WinnerInfo {
  name: string;
  score: string;
}

type ScoreSelector = typeof getScore;

function getScore(summary: ScoreSummary) {
  return summary.Score.toString();
}

function getPercent(summary: ScoreSummary) {
  return "%" + Math.round(summary.WinPercent * 100);
}

function getWinnerInfoFromSummary(
  json: DoneSortedArray,
  selector: ScoreSelector
): WinnerInfo {
  const summary = json.Done["Sorted Array"][0];
  return {
    name: summary.PartyName,
    score: selector(summary)
  };
}

/**
 * HOF ftw
 * @param flowAlias of flow to fetch
 * @returns async fetch interaction.
 */
function makeWrappedTileFetch(flowAlias: string, selector: ScoreSelector) {
  return new Promise<WinnerInfo>((resolve, reject) =>
    fetch(getFlowAliasUrl(flowAlias))
      .then(
        response =>
          response.json && // 403s still trigger fetch.then!!1?
          response.json().then((json: DoneSortedArray) => {
            resolve(getWinnerInfoFromSummary(json, selector));
          })
      )
      .catch(reason => {
        reject(reason);
      })
  );
}

export interface ScoreSummary {
  ID: string;
  Total: number;
  Score: number;
  Outcome: string;
  PartyName: string;
  WinPercent: number;
  Hidden: boolean;
  AdministratorViewOnly: boolean;
  EntityFolderID: string;
  HistoryFolderID: string;
  AllTagsData: string;
  EntityName: string;
  EntityDescription: string;
  State: string;
  CreatedOnDate: Date;
  ModifiedDate: Date;
  CreatedBy: string;
  ModifiedBy: string;
  Archived: boolean;
  ArchivedBy: string;
  ArchivedDate: Date;
  Deleted: boolean;
  DeletedBy: string;
  DeletedOn: Date;
}
