import { ReactNode, FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CgCloseR } from 'react-icons/cg';

type ModalProps = {
  isOpen: boolean;
  close: (e: any) => void;
  children?: ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, close, children }) => {
  if (!isOpen) return null;

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close(e);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  }, []);

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