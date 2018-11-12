import * as React from "react";
import { Bet, getBetId } from "src/rest-api/Bet";
import { BetsApi } from "src/rest-api/BetsApi";
import BetTableRow from "./BetRow";
import BetTable from "./BetTable";

// tslint:disable-next-line:no-empty-interface
export interface OpenBetsProps {}

export interface OpenBetsState {
  bets: Bet[];
}

export default class OpenBets extends React.Component<
  OpenBetsProps,
  OpenBetsState
> {
  getRows = (bets: Bet[]) =>
    bets.map(bet => <BetTableRow key={getBetId(bet)} bet={bet} />);

  public render() {
    return (
      <BetTable apiMethod={BetsApi.fetchBetsOpen}>
        {({ bets }) => this.getRows(bets)}
      </BetTable>
    );
  }
}
