import * as React from "react";
import "./WinsTile.css";

interface WinsTileProps {
  title: string;
  score: string;
  icon?: string;
}

const WinsTile: React.SFC<WinsTileProps> = ({
  title,
  children,
  icon,
  score
}) => {
  return (
    <div className="tds-wins-tile">
      <img className="tds-wins-tile__icon" src={icon} />
      <h2 className="tds-wins-tile__title">{title}</h2>
      <p className="tds-wins-tile__contents">{children}</p>
      <h1 className="tds-wins-tile__score">{score}</h1>
    </div>
  );
};

export default WinsTile;
