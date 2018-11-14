import * as React from "react";
import "./WinsTile.css";

interface WinsTileProps {
  title: string;
}

const WinsTile: React.SFC<WinsTileProps> = ({ title, children }) => {
  return (
    <div className="tds-wins-tile">
      <h4 className="tds-wins-tile__title">{title}</h4>
      <p className="tds-wins-tile__contents">{children}</p>
    </div>
  );
};

export default WinsTile;
