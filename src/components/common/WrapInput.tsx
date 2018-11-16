import * as classNames from "classnames";
import * as React from "react";
import "./WrapInput.css";

interface WrapInputProps extends React.HTMLProps<HTMLLabelElement> {
  htmlFor: string;
  label: string;
}

const WrapInput: React.SFC<WrapInputProps> = ({
  htmlFor,
  label,
  children,
  className
}) => {
  return (
    <label htmlFor={htmlFor} className={classNames("wrapped-input", className)}>
      <span className="wrapped-input__label">{label}</span>
      {children}
    </label>
  );
};

export default WrapInput;
