import { AuthApi } from "./AuthApi";
import { Party } from "./Party";

export interface CreatingBet {
  name: string;
  /** Date ISO string */
  Deadline: string;
  Judge: string;
  Notes: string;
  Parties: Party[];
}

/** POST payload expected */
export interface CreatingBetPayload {
  outputtype: "Json";
  "Bet Name": string; // bleeerg
  /** Date ISO string */
  Deadline: string;
  Judge: string;
  Notes: string;
  Parties: Party[];
}

export function makeCreatingBetObject(
  name: string,
  deadline: string,
  parties: Party[],
  notes = ""
): CreatingBetPayload {
  return {
    "Bet Name": name,
    Deadline: deadline,
    outputtype: "Json",
    // tslint:disable-next-line:object-literal-sort-keys // because it's wrong!!
    Judge: AuthApi.getSessionUserName() || "",
    Notes: notes,
    Parties: parties
  };
}
