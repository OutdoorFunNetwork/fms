import { ReactNode, FC } from 'react';
import { createPortal } from 'react-dom';

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
        Test
        <button type="submit" onClick={close}>close</button>
      </div>
      <div className="modalContainer--backdrop"></div>
    </div>
  , document.getElementById('modal-portal')!)
};

export default Modal;