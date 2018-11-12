import * as React from "react";
import {
  Bet,
  getBetDateCreated,
  getBetJudge,
  getBetName
} from "src/rest-api/Bet";

export interface BetTableRowProps {
  bet: Bet;
}

export default class BetTableRow extends React.Component<
  BetTableRowProps,
  any
> {
  public render() {
    const { bet } = this.props;
    return (
      <tr>
        <td>{getBetName(bet)}</td>
        <td>{getBetDateCreated(bet)}</td>
        <td>{getBetJudge(bet)}</td>
      </tr>
    );
  }
}
