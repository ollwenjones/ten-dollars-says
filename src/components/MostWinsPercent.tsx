import * as React from "react";
import { TileFlowApi } from "src/rest-api/TileFlowApi";
import percent from "../img/percent.svg";
import MostWins from "./MostWins";

const MostWinsPercent: React.SFC<{}> = () => {
  return (
    <MostWins
      title="Best Percentage"
      fetchMethod={TileFlowApi.fetchHighestPercent}
      icon={percent}
    />
  );
};

export default MostWinsPercent;
