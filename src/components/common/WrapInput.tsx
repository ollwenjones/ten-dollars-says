import * as React from "react";
import "./WrapInput.css";

interface WrapInputProps {
  htmlFor: string;
  label: string;
}

const WrapInput: React.SFC<WrapInputProps> = ({ htmlFor, label, children }) => {
  return (
    <label htmlFor={htmlFor} className="wrapped-input">
      <span className="wrapped-input__label">{label}</span>
      {children}
    </label>
  );
};

export default WrapInput;
