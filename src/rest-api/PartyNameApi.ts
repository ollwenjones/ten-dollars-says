import { getFlowAliasUrl, getWrappedFetch } from "./ApiHelpers";

// very naive search. just hits REST API.
// assumes any debounce/cancel are implemented elsewhere.
export const PartyNameApi = {
  getPartyNames: (searchString: string): Promise<string[]> =>
    getWrappedFetch(getPartySearchUrl(searchString), "parties")
};

function getPartySearchUrl(searchString: string) {
  return `${getFlowAliasUrl("tds/party-names/")}&searchString=${searchString}`;
}
