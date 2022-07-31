import { FC, memo, PropsWithChildren } from 'react';
import './BaseButton.scss';

export interface BaseButtonProps {
  className?: string;
  onClick: () => void;
}

const BaseButton: FC<PropsWithChildren<BaseButtonProps>> = props => {
  const { className = '', onClick, children } = props;

  return (
    <button className={`base-btn ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(BaseButton);
