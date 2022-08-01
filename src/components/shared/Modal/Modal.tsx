import { FC, memo, PropsWithChildren, useCallback } from 'react';
import BaseButton from '../BaseButton';
import { CloseIcon } from '../icons';

import './Modal.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const Modal: FC<PropsWithChildren<ModalProps>> = props => {
  const { open, onClose, className = '', children } = props;

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onClose();
    },
    [onClose],
  );

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick} />
      <div className={`modal ${className}`}>
        <div className="modal__content">
          <div className="modal__header">
            <BaseButton onClick={onClose}>
              <CloseIcon />
            </BaseButton>
          </div>
          <div className="modal__body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default memo(Modal);
