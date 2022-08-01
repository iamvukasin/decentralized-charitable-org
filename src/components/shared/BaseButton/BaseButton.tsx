import { FC, memo, PropsWithChildren } from 'react';
import './BaseButton.scss';

export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const BaseButton: FC<PropsWithChildren<BaseButtonProps>> = props => {
  const { className = '', disabled, onClick, children } = props;

  return (
    <button className={`base-btn ${className}`} type="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(BaseButton);
