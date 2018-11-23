import { format } from "date-fns";
import * as React from "react";
import { AuthApi } from "src/rest-api/AuthApi";
import {
  Bet,
  getBetCompleted,
  getBetDeadline,
  getBetDescription,
  getBetJudge,
  getBetName,
  getBetParties
} from "src/rest-api/Bet";
import { getWinningPartyNames } from "src/rest-api/Party";

const DATE_FORMAT = "MM/DD/YY H:MM A";

export interface BeginsJudgeBet {
  onJudgeBet?: (bet: Bet) => void;
}

export interface BetTableRowProps extends BeginsJudgeBet {
  bet: Bet;
}

export interface BetTableRowState {
  expanded: boolean;
}

export default class BetTableRow extends React.Component<
  BetTableRowProps,
  BetTableRowState
> {
  state = { expanded: false };

  onJudgeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (this.props.onJudgeBet) {
      this.props.onJudgeBet(this.props.bet);
    }
  };

  getJudgeCellContents = () => {
    if (getBetCompleted(this.props.bet)) {
      // want to show winners instead:
      return getWinningPartyNames(getBetParties(this.props.bet)).join(", ");
    }
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

  getPartySubRows = () =>
    this.props.bet.parties.map(party => (
      <tr key={party.PartyName} className="tds-bets__table__row--sub">
        <td />
        <td colSpan={3}>
          <div>
            <span className="tds-bets__table__party-name">
              {party.PartyName}:
            </span>
            <em> {party.Position}</em>
          </div>
        </td>
      </tr>
    ));

  onExpandToggle = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  public render() {
    const { bet } = this.props;
    return (
      <tbody className="tds-bets__table__row">
        <tr className="tds-bets__table__row--main">
          <td className="tds-bets__table__expand" onClick={this.onExpandToggle}>
            {this.state.expanded ? "-" : "+"}
          </td>
          <td className="tds-bets__table__name">{getBetName(bet)}</td>
          <td className="tds-bets__table__deadline">
            {format(getBetDeadline(bet), DATE_FORMAT)}
          </td>
          <td className="tds-bets__table__judge">
            {this.getJudgeCellContents()}
          </td>
        </tr>
        {this.state.expanded && [
          <tr key="details" className="tds-bets__table__row--sub">
            <td />
            <td className="tds-bets__table__description" colSpan={3}>
              {getBetDescription(bet)}
            </td>
          </tr>,
          this.getPartySubRows()
        ]}
      </tbody>
    );
  }
}
