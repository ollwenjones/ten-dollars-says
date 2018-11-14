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
        <td className="tds-bets__table__name">{getBetName(bet)}</td>
        <td className="tds-bets__table__date">
          {format(getBetDateCreated(bet), DATE_FORMAT)}
        </td>
        <td className="tds-bets__table__judge">{getBetJudge(bet)}</td>
      </tr>
    );
  }
}
