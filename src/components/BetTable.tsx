import * as classNames from "classnames";
import * as React from "react";
import { Bet } from "src/rest-api/Bet";
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
export default class BetTable extends React.Component<
  BetTableProps,
  BetTableState
> {
  state = { ...defaultState };

  componentDidMount() {
    this.props.apiMethod().then(bets => {
      this.setState({ bets });
    });
  }

  public render() {
    return (
      <section className={classNames("tds-bets__list", this.props.className)}>
        <h4 className="tds-bets__title">{this.props.title}</h4>
        <table className="tds-bets__table">
          <tbody>{this.props.children({ bets: this.state.bets })}</tbody>
        </table>
      </section>
    );
  }
}
