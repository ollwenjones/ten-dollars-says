import { getFlowAliasUrl } from "./ApiHelpers";

interface PartyNameSearchResult {
  result: {
    parties: string[];
  };
}

// very naive search. just hits REST API.
// assumes any debounce/cancel are implemented elsewhere.
export const PartyNameApi = {
  getPartyNames: (searchString: string): Promise<string[]> =>
    new Promise((resolve, reject) =>
      fetch(getPartySearchUrl(searchString))
        .then(response => {
          response.json().then(({ result }: PartyNameSearchResult) => {
            resolve(result.parties || []);
          });
        })
        .catch(reason => reject(reason))
    )
};

function getPartySearchUrl(searchString: string) {
  return `${getFlowAliasUrl("tds/party-names/")}&searchString=${searchString}`;
}