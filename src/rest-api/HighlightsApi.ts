import { getFlowAliasUrl, getResponseJson } from "./ApiHelpers";

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
  return Math.round(summary.WinPercent * 100) + "%";
}

function getWinnerInfoFromSummary(
  json: DoneSortedArray,
  selector: ScoreSelector
): WinnerInfo {
  const summaries = json.Done["Sorted Array"];
  if (!summaries) {
    return {
      name: "Nobody?",
      score: "None."
    };
  }
  const summary = summaries[0];
  return {
    name: summary.PartyName.split("@")[0], // if party name is an email, just include the name, for now
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
      .then(response =>
        getResponseJson(
          response,
          (json: DoneSortedArray) =>
            resolve(getWinnerInfoFromSummary(json, selector)),
          reject
        )
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
