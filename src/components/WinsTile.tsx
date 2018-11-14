import * as React from "react";

interface WinsTileProps {
  title: string;
}

const WinsTile: React.SFC<WinsTileProps> = ({ title, children }) => {
  return (
    <div className="tds-wins-tile">
      <h4>{title}</h4>
      <p>{children}</p>
    </div>
  );
};

export default WinsTile;
