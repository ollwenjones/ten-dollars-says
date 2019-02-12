import * as classNames from "classnames";
import * as React from "react";
import { ApiConfig } from "src/rest-api/ApiConfig";
import { Bet } from "src/rest-api/Bet";
import {
  UpdateSubscriber,
  UpdateSubscriptions
} from "src/rest-api/UpdateSubscriptions";
import "./BetTable.css";
import { Loader } from "./common/Loader";

export interface BetTableProps extends React.HTMLProps<{}> {
  apiMethod: () => Promise<Bet[]>;
  children: (props: BetTableRenderProps) => JSX.Element[];
  completedBets?: boolean;
}

export interface BetTableRenderProps {
  bets: Bet[];
}

export interface BetTableState {
  bets: Bet[];
  busy: boolean;
}

const defaultState: BetTableState = {
  bets: [],
  busy: false
};

/**
 * A wrapper element to encapsulate common DOM and state management behaviors
 * For a bet "report" table, using
 * [render props](https://reactjs.org/docs/render-props.html)
 */
export default class BetTable
  extends React.Component<BetTableProps, BetTableState>
  implements UpdateSubscriber {
  state = { ...defaultState };

  updateModel = () => {
    this.setState({ busy: true });

    if (!ApiConfig.isLoaded) {
      setTimeout(() => {
        // wait for config to load, inelegant, but #POC.
        this.updateModel();
      }, 50);
      return;
    }

    this.props
      .apiMethod()
      .then(bets => {
        this.setState({ bets, busy: false });
      })
      .catch(() => this.setState({ busy: false }));
  };

  componentDidMount() {
    UpdateSubscriptions.addSubscriber(BetTable.name, this);
    this.updateModel();
  }

  componentWillUnmount() {
    UpdateSubscriptions.removeSubscriber(BetTable.name);
  }

  getJudgeWinnerColumnTitle = () =>
    this.props.completedBets ? "Winner(s)" : "Judge";

  public render() {
    return (
      <section className={classNames("tds-bets__list", this.props.className)}>
        <table className="tds-bets__table">
          <thead className="tds-bets__thead">
            <tr>
              <td className="tds-bets__table__expand" />
              <td className="tds-bets__table__name">Name</td>
              <td className="tds-bets__table__deadline">Deadline</td>
              <td className="tds-bets__table__judge">
                {this.getJudgeWinnerColumnTitle()}
              </td>
            </tr>
          </thead>
          {this.props.children({ bets: this.state.bets })}
        </table>
        <Loader busy={this.state.busy} />
      </section>
    );
  }
}
