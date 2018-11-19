import { DECISIONS_ROOT } from "./ApiConfig";
import { AuthApi } from "./AuthApi";
import { TileData } from "./TileData";

export const TileFlowApi = {
  fetchHighestPercent: () =>
    makeWrappedTileFetch("49ca47b5-bc23-11e8-a989-81c1bba3abd0"),
  fetchMostWins: () =>
    makeWrappedTileFetch("4fd63175-bc22-11e8-a989-81c1bba3abd0")
};

// TODO rip this out when I get a better end-point flow set up
interface DoneTile {
  Done: {
    TileData: TileData;
  };
}

export interface WinnerInfo {
  title: string;
  value: string;
}

function getFlowUrl(id: string) {
  const sessionId = AuthApi.getSessionId(); // TODO escape?
  return `${DECISIONS_ROOT}?FlowId=${id}&Action=api&outputtype=JSON&sessionId=${sessionId}`;
}

/**
 * HOF ftw
 * @param flowId of flow to fetch
 * @returns async fetch interaction.
 */
function makeWrappedTileFetch(flowId: string) {
  return new Promise<WinnerInfo>((resolve, reject) =>
    fetch(getFlowUrl(flowId))
      .then(
        response =>
          response.json && // 403s still trigger fetch.then!!1?
          response.json().then((json: DoneTile) => {
            resolve({
              title: json.Done.TileData.TileDetails.TitleText,
              value: json.Done.TileData.TileDetails.CounterText
            });
          })
      )
      .catch(reason => {
        reject(reason);
      })
  );
}
