import * as React from "react";
import MostWins from "./MostWins";
import MostWinsPercent from "./MostWinsPercent";

// tslint:disable-next-line:no-empty-interface
interface HighlightsProps {}

const Highlights: React.SFC<HighlightsProps> = props => {
  return (
    <div className="tds-highlights">
      <MostWins />
      <MostWinsPercent />
    </div>
  );
};

export default Highlights;
