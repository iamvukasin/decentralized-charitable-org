import { FC, memo } from 'react';
import './BaseButton.scss';

export interface BaseButtonProps {
  className?: string;
  onClick: () => void;
}

const BaseButton: FC<BaseButtonProps> = props => {
  const { className = '', onClick, children } = props;

  return (
    <button className={`base-btn ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default memo(BaseButton);
