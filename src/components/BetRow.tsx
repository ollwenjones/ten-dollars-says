import { format } from "date-fns";
import * as React from "react";
import { AuthApi } from "src/rest-api/AuthApi";
import { Bet, getBetDeadline, getBetJudge, getBetName } from "src/rest-api/Bet";

const DATE_FORMAT = "MM/DD/YY H:MM A";

export interface BeginsJudgeBet {
  onJudgeBet?: (bet: Bet) => void;
}

export interface BetTableRowProps extends BeginsJudgeBet {
  bet: Bet;
}

export default class BetTableRow extends React.Component<
  BetTableRowProps,
  any
> {
  onJudgeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (this.props.onJudgeBet) {
      this.props.onJudgeBet(this.props.bet);
    }
  };

  getJudgeCellContents = () => {
    const judgeName = getBetJudge(this.props.bet);
    const currentUser = AuthApi.getSessionUserName();
    return this.props.onJudgeBet && judgeName === currentUser ? (
      <a href="" onClick={this.onJudgeClick}>
        {judgeName}
      </a>
    ) : (
      judgeName
    );
  };

  public render() {
    const { bet } = this.props;
    return (
      <tr className="tds-bets__table__row">
        <td className="tds-bets__table__name">{getBetName(bet)}</td>
        <td className="tds-bets__table__deadline">
          {format(getBetDeadline(bet), DATE_FORMAT)}
        </td>
        <td className="tds-bets__table__judge">
          {this.getJudgeCellContents()}
        </td>
      </tr>
    );
  }
}
