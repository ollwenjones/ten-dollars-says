import * as React from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  show?: boolean;
  onClose?: () => void;
}

export default class Modal extends React.Component<ModalProps, any> {
  target = document.createElement("div");

  componentDidMount() {
    document.appendChild(this.target);
  }

  componentWillUnmount() {
    document.removeChild(this.target);
  }

  public render() {
    createPortal(
      <div className="modal">
        <div className="modal__scrim" />
        <div className="modal__contents">
          {this.props.title ? (
            <h4 className="modal__title">{this.props.title}</h4>
          ) : null}
          {this.props.children}
        </div>
      </div>,
      this.target
    );
    return null;
  }
}
