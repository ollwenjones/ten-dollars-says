export const enum PartyBetOutcome {
  WIN = "Win",
  LOSS = "Loss"
}

/**
 * A "betting party" - track people's participation in the bets
 */
export interface Party {
  AdministratorViewOnly: boolean;
  AllTagsData?: string;
  Amount: number;
  Archived: boolean;
  ArchivedBy?: string;
  ArchivedDate: string;
  CreatedBy?: string;
  CreatedOnDate: string;
  Deleted: boolean;
  DeletedBy?: string;
  DeletedOn: string;
  EntityDescription?: string;
  EntityFolderID?: string;
  EntityName?: string;
  Hidden: boolean;
  HistoryFolderID?: string;
  ID?: string;
  ModifiedBy?: string;
  ModifiedDate: string;
  /** Outcome is undefined if the bet is yet to be judged */
  Outcome?: PartyBetOutcome;
  PartyName: string;
  Position?: string;
  State?: string;
}

/**
 * @return new object with minimum required fields for the Party object
 */
export function getBasePartyReqFields(): Party {
  return {
    AdministratorViewOnly: false,
    Amount: 10,
    Archived: false,
    ArchivedDate: new Date().toISOString(),
    CreatedOnDate: new Date().toISOString(),
    Deleted: false,
    DeletedOn: new Date().toISOString(),
    Hidden: false,
    ModifiedDate: new Date().toISOString(),
    PartyName: ""
  };
}

export function getBaseParties(count: number) {
  const parties: Party[] = [];
  for (let i = 0; i < count; i++) {
    parties.push(getBasePartyReqFields());
  }
  return parties;
}

/**
 * Get a new party object (immutable pattern).
 * @param name of party
 * @param position of party
 * @param previous optional previous party details
 * @returns new party object.
 */
export function updateParty(
  name: string,
  position: string,
  previous = getBasePartyReqFields()
): Party {
  return {
    ...previous,
    PartyName: name,
    Position: position
  };
}

/**
 * @param name to set
 * @param party to update
 * @returns new party object.
 */
export function updatePartyName(name: string, party: Party) {
  return updateParty(name, party.Position || "", party);
}

/**
 *
 * @param betPosition to set
 * @param party to update
 * @returns new party object.
 */
export function updatePartyBetPosition(betPosition: string, party: Party) {
  return updateParty(party.PartyName, betPosition, party);
}

/**
 * @param parties to check
 * @return parties that won
 */
export function getWinningParties(parties: Party[]) {
  return parties.filter(party => party.Outcome === PartyBetOutcome.WIN);
}

/**
 * @param parties to check for win, and retrieve names
 * @return names of parties that won.
 */
export function getWinningPartyNames(parties: Party[]) {
  return getWinningParties(parties).map(party => party.PartyName);
}
