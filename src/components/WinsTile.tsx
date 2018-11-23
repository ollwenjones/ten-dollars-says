import * as React from "react";
import "./WinsTile.css";

interface WinsTileProps {
  title: string;
  icon?: string;
}

const WinsTile: React.SFC<WinsTileProps> = ({ title, children, icon }) => {
  return (
    <div className="tds-wins-tile">
      <img className="tds-wins-tile__icon" src={icon} />
      <h2 className="tds-wins-tile__title">{title}</h2>
      <p className="tds-wins-tile__contents">{children}</p>
    </div>
  );
};

export default WinsTile;
