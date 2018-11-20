import { getFlowAliasUrl, getFlowIdUrl } from "./ApiHelpers";
import { TileData } from "./TileData";

export const TileFlowApi = {
  fetchHighestPercent: () =>
    makeWrappedTileFetch("49ca47b5-bc23-11e8-a989-81c1bba3abd0"),
  fetchMostWins: () =>
    new Promise<WinnerInfo>((resolve, reject) =>
      fetch(getFlowAliasUrl("tds/most/wins"))
        .then(
          response =>
            response.json && // 403s still trigger fetch.then!!1?
            response.json().then((json: DoneSortedArray) => {
              resolve(getWinnerInfoFromSummary(json));
            })
        )
        .catch(reason => {
          reject(reason);
        })
    )
};

// TODO rip this out when I get a better end-point flow set up
interface DoneTile {
  Done: {
    TileData: TileData;
  };
}

interface DoneSortedArray {
  Done: {
    "Sorted Array": ScoreSummary[];
  };
}

export interface WinnerInfo {
  title: string;
  value: string;
}

function getWinnerInfoFromTileData(json: DoneTile): WinnerInfo {
  return {
    title: json.Done.TileData.TileDetails.TitleText,
    value: json.Done.TileData.TileDetails.CounterText
  };
}

function getWinnerInfoFromSummary(json: DoneSortedArray): WinnerInfo {
  const summary = json.Done["Sorted Array"][0];
  const value = `${summary.PartyName}: ${summary.Score.toString()}`;
  return {
    title: summary.PartyName,
    value
  };
}

/**
 * HOF ftw
 * @param flowId of flow to fetch
 * @returns async fetch interaction.
 */
function makeWrappedTileFetch(flowId: string) {
  return new Promise<WinnerInfo>((resolve, reject) =>
    fetch(getFlowIdUrl(flowId))
      .then(
        response =>
          response.json && // 403s still trigger fetch.then!!1?
          response.json().then((json: DoneTile) => {
            resolve(getWinnerInfoFromTileData(json));
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
