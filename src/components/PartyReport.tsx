import * as React from "react";
import { BetsApi } from "src/rest-api/BetsApi";

export interface PartyReportState {
  report: any[];
}

export default class PartyReport extends React.Component<{}, any> {
  state = { report: [] };

  componentDidMount() {
    BetsApi.fetchPartyReport().then(report => this.setState({ report }));
  }

  public render() {
    return (
      <section>
        <h4>Wins By Person</h4>
        <p>
          Be good to make a report that was key:value or CSV instead of an array
          for us to count client-side, but this is what we have for now:
        </p>
        <pre>{JSON.stringify(this.state.report, null, "  ")}</pre>; React C3js
        Chart if there's time?
      </section>
    );
  }
}
