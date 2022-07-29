import { FC, memo, useMemo } from 'react';
import { Button, LinkButton, ProgressBar } from '../shared';
import './Target.scss';

interface TargetProps {
  id: string;
  collected: number;
  goal: number;
  currency: string;
  disabled?: boolean;
  onDonate?: () => void;
}

const Target: FC<TargetProps> = props => {
  const { id, collected, goal, currency, disabled, onDonate } = props;

  const isFunded = collected >= goal;
  const buttonLabel = isFunded ? 'Funded' : 'Donate';

  return (
    <div className="target">
      <ProgressBar value={collected / goal} />
      <div className="target__info">
        <span className="target__collected">
          {collected} {currency}
        </span>
        <span className="target__goal">
          {goal} {currency}
        </span>
      </div>
      <div className="target__action">
        {onDonate ? (
          <Button variant="primary" disabled={disabled || isFunded} onClick={onDonate}>
            {buttonLabel}
          </Button>
        ) : (
          <LinkButton variant="primary" to={`/donate/${id}`}>
            {buttonLabel}
          </LinkButton>
        )}
      </div>
    </div>
  );
};

export default memo(Target);
