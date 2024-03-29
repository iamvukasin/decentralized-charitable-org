import { FC, memo, PropsWithChildren } from 'react';
import BaseButton, { BaseButtonProps } from '../BaseButton';
import './Button.scss';

type ButtonVariant = 'primary' | 'neutral';

export interface ButtonStyleProps {
  variant?: ButtonVariant;
  disabled?: boolean;
}

type ButtonProps = BaseButtonProps & ButtonStyleProps;

const Button: FC<PropsWithChildren<ButtonProps>> = props => {
  const { variant = 'primary', disabled = false, className = '', onClick, children } = props;

  return (
    <BaseButton
      className={`button button--${variant} ${disabled ? 'button--disabled' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </BaseButton>
  );
};

export default memo(Button);
