import * as React from "react";
import * as ReactModal from "react-modal";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onRequestClose?: () => void;
}

/**
 * Simple ReactModal wrapper to normalize styling
 * @param props
 */
const Modal: React.SFC<ModalProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      className="modal__contents"
      overlayClassName="modal__overlay"
      onRequestClose={onRequestClose}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
