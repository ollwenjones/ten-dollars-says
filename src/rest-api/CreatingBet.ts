import { CreateBetFormState } from "src/components/CreateBetForm";
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
  BetName: string;
  /** Date ISO string */
  Deadline: string;
  Judge: string;
  Notes: string;
  Parties: Party[];
  Description: string;
  Amount: number;
}

export function makeCreatingBetObject(
  name: string,
  { deadline, description, parties, judge, notes }: CreateBetFormState
): CreatingBetPayload {
  return {
    BetName: name,
    Deadline: deadline.toISOString(),
    outputtype: "Json",
    // tslint:disable-next-line:object-literal-sort-keys // because it's wrong!!
    Judge: judge,
    Notes: notes,
    Parties: parties,
    Description: description,
    Amount: 10
  };
}
