import { format } from "date-fns";
import * as React from "react";
import {
  Bet,
  getBetDateCreated,
  getBetJudge,
  getBetName
} from "src/rest-api/Bet";

const DATE_FORMAT = "MM/DD/YY H:MM A";

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
      <tr className="tds-bets__table__row">
        <td>{getBetName(bet)}</td>
        <td>{format(getBetDateCreated(bet), DATE_FORMAT)}</td>
        <td>{getBetJudge(bet)}</td>
      </tr>
    );
  }
}
