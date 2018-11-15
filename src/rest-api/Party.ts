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
