import * as React from "react";
import "./Loader.css";

interface LoaderProps {
  busy?: boolean;
}

export const Loader: React.SFC<LoaderProps> = props => {
  return props.busy ? (
    <div className="tds-loader">
      <div className="tds-loader__spinner tds-loader__spinner--simple">
        <div className="tds-loader__spinner__outer" />
        <div className="tds-loader__spinner__inner" />
      </div>
    </div>
  ) : null;
};
