import * as React from "react";
import "./WrapInput.css";

interface WrapInputProps {
  id: string;
  label: string;
}

const WrapInput: React.SFC<WrapInputProps> = ({ label, children }) => {
  return (
    <label htmlFor="id" className="wrapped-input">
      <span className="wrapped-input__label">{label}</span>
      {children}
    </label>
  );
};

export default WrapInput;
