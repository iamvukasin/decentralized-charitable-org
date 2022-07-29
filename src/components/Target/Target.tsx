import BN from 'bn.js';
import { FC, memo, useMemo } from 'react';
import { bnToNumber, formatBN } from '../../utils';
import { Button, LinkButton, ProgressBar } from '../shared';
import './Target.scss';

interface TargetProps {
  id: string;
  collected: BN;
  goal: BN;
  currency: string;
  disabled?: boolean;
  onDonate?: () => void;
}

const Target: FC<TargetProps> = props => {
  const { id, collected, goal, currency, disabled, onDonate } = props;

  const collectedNumber = useMemo(() => bnToNumber(collected), [collected]);
  const formattedCollected = useMemo(() => formatBN(collected, 4), [collected]);
  const goalNumber = useMemo(() => bnToNumber(goal), [goal]);
  const formattedGoal = useMemo(() => formatBN(goal, 4), [goal]);

  const isFunded = collected.gte(goal);
  const buttonLabel = isFunded ? 'Funded' : 'Donate';

  return (
    <div className="target">
      <ProgressBar value={collectedNumber / goalNumber} />
      <div className="target__info">
        <span className="target__collected">
          {formattedCollected} {currency}
        </span>
        <span className="target__goal">
          {formattedGoal} {currency}
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
