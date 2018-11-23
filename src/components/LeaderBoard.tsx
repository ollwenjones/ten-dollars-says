import * as React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { BetsApi } from "src/rest-api/BetsApi";
import {
  UpdateSubscriber,
  UpdateSubscriptions
} from "src/rest-api/UpdateSubscriptions";
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

export class LeaderBoard extends React.Component<{}, LeaderBoardState>
  implements UpdateSubscriber {
  state: LeaderBoardState = { winners: [] };

  updateModel() {
    BetsApi.fetchPartyReport().then((report: any) =>
      this.setState({ winners: report })
    );
  }

  componentDidMount() {
    // HOC for this boilerplate?
    this.updateModel();
    UpdateSubscriptions.addSubscriber(LeaderBoard.name, this);
  }

  componentWillUnmount() {
    UpdateSubscriptions.removeSubscriber(LeaderBoard.name);
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

  getData = () => {
    const winners = this.getWinsByName();
    return Object.keys(winners)
      .map(name => ({
        name,
        wins: winners[name]
      }))
      .sort((a, b) => b.wins - a.wins)
      .slice(0, 5);
  };

  public render() {
    return (
      <section className="tds-leaderboard">
        <h4 className="tds-leaderboard__title">Leaderboard</h4>
        <ResponsiveContainer width="90%" height={250}>
          <BarChart
            data={this.getData()}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 150, bottom: 0 }}
          >
            <XAxis type="number" allowDecimals={false} />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="wins" fill="#bada55" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    );
  }
}
