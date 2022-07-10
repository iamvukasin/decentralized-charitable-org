import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonStyleProps } from '../Button/Button';

interface LinkButtonProps extends ButtonStyleProps {
  to: string;
}

const LinkButton: FC<LinkButtonProps> = props => {
  const { variant, disabled, to, children } = props;

  return (
    <Link className={`link-button button button--${variant} ${disabled ? 'button--disabled' : ''}`} to={to}>
      {children}
    </Link>
  );
};

export default memo(LinkButton);
