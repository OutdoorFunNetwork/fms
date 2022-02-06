import { ReactNode, FC } from 'react';
import { createPortal } from 'react-dom';
import { CgCloseR } from 'react-icons/cg';

type ModalProps = {
  isOpen: boolean;
  close: (e: any) => void;
  children?: ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, close, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modalContainer">
      <div className="modalContainer--body">
        {children}
        <button type="submit" onClick={close} className="modalContainer--close">
          <CgCloseR />
        </button>
      </div>
      <div className="modalContainer--backdrop"></div>
    </div>
  , document.getElementById('modal-portal')!)
};

export default Modal;