import { FC, memo } from 'react';
import BaseButton, { BaseButtonProps } from '../BaseButton';
import './Button.scss';

type ButtonVariant = 'primary' | 'neutral';

interface ButtonProps extends BaseButtonProps {
  variant?: ButtonVariant;
}

const Button: FC<ButtonProps> = props => {
  const { variant = 'primary', className = '', onClick, children } = props;

  return (
    <BaseButton className={`button button--${variant} ${className}`} onClick={onClick}>
      {children}
    </BaseButton>
  );
};

export default memo(Button);
