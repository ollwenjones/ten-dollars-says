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
  Outcome?: string;
  PartyName?: string;
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
    ModifiedDate: new Date().toISOString()
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
  return updateParty(party.PartyName || "", betPosition, party);
}
