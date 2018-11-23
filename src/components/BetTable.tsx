import * as classNames from "classnames";
import * as React from "react";
import { Bet } from "src/rest-api/Bet";
import {
  UpdateSubscriber,
  UpdateSubscriptions
} from "src/rest-api/UpdateSubscriptions";
import "./BetTable.css";

export interface BetTableProps extends React.HTMLProps<{}> {
  apiMethod: () => Promise<Bet[]>;
  children: (props: BetTableRenderProps) => JSX.Element[];
}

export interface BetTableRenderProps {
  bets: Bet[];
}

export interface BetTableState {
  bets: Bet[];
}

const defaultState: BetTableState = {
  bets: []
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

  updateModel = () =>
    this.props.apiMethod().then(bets => {
      this.setState({ bets });
    });

  componentDidMount() {
    UpdateSubscriptions.addSubscriber(BetTable.name, this);
    this.updateModel();
  }

  componentWillUnmount() {
    UpdateSubscriptions.removeSubscriber(BetTable.name);
  }

  public render() {
    return (
      <section className={classNames("tds-bets__list", this.props.className)}>
        <table className="tds-bets__table">
          <thead className="tds-bets__thead">
            <tr>
              <td className="tds-bets__table__name">Name</td>
              <td className="tds-bets__table__deadline">Deadline</td>
              <td className="tds-bets__table__judge">Judge</td>
            </tr>
          </thead>
          <tbody>{this.props.children({ bets: this.state.bets })}</tbody>
        </table>
      </section>
    );
  }
}
