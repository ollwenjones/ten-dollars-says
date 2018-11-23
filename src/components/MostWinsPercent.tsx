import * as React from "react";
import { HighlightsApi } from "src/rest-api/HighlightsApi";
import percent from "../img/percent.svg";
import MostWins from "./MostWins";

const MostWinsPercent: React.SFC<{}> = () => {
  return (
    <MostWins
      title="Best Percentage"
      fetchMethod={HighlightsApi.fetchHighestPercent}
      icon={percent}
    />
  );
};

export default MostWinsPercent;
