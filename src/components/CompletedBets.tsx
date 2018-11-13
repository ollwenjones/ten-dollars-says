import * as React from "react";
import { Bet, getBetId } from "src/rest-api/Bet";
import { BetsApi } from "src/rest-api/BetsApi";
import BetTableRow from "./BetRow";
import BetTable from "./BetTable";

// tslint:disable-next-line:no-empty-interface
export interface CompletedBetsProps {}

export interface CompletedBetsState {
  bets: Bet[];
}

export default class CompletedBets extends React.Component<
  CompletedBetsProps,
  CompletedBetsState
> {
  getRows = (bets: Bet[]) =>
    bets.map(bet => <BetTableRow key={getBetId(bet)} bet={bet} />);

  public render() {
    return (
      <BetTable
        apiMethod={BetsApi.fetchBetsCompleted}
        className="completed-bets"
        title="Completed Bets"
      >
        {({ bets }) => this.getRows(bets)}
      </BetTable>
    );
  }
}
