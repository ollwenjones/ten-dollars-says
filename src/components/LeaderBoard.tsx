import * as React from "react";
import { BetsApi } from "src/rest-api/BetsApi";
import "./LeaderBoard.css";

export interface TdsParty {
  party_name: string;
  outcome: string;
  created_on_date: Date;
  entity_id: string;
  entity_type_name: string;
}

export interface LeaderBoardState {
  winners: TdsParty[];
}

export class LeaderBoard extends React.Component<{}, LeaderBoardState> {
  state: LeaderBoardState = { winners: [] };

  componentDidMount() {
    BetsApi.fetchPartyReport().then((report: any) =>
      this.setState({ winners: report })
    );
  }

  // Be good to make a report that was key:value or CSV instead of an array
  // for us to count client-side, but this is what we have for now:

  getWinsByName = () => {
    const countByName: { [key: string]: number } = {};
    this.state.winners.map(party => {
      if (countByName[party.party_name]) {
        countByName[party.party_name] += 1;
      } else {
        countByName[party.party_name] = 1;
      }
    });
    return countByName;
  };

  getLeaders = () => {
    // charting library if there's time
    const winners = this.getWinsByName();
    return Object.keys(winners).map(winner => (
      <tr key={winner}>
        <td>{winner}</td>
        <td>{winners[winner]}</td>
      </tr>
    ));
  };

  public render() {
    return (
      <section className="tds-leaderboard">
        <h4 className="tds-leaderboard__title">Leaderboard</h4>
        <table>
          <tbody>{this.getLeaders()}</tbody>
        </table>
      </section>
    );
  }
}
