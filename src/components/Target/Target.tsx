import { FC, memo } from 'react';
import { Button, ProgressBar } from '../shared';
import './Target.scss';

interface TargetProps {
  collected: number;
  goal: number;
  currency: string;
}

const Target: FC<TargetProps> = props => {
  const { collected, goal, currency } = props;

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
        <Button variant="primary" onClick={() => {}}>
          Donate
        </Button>
      </div>
    </div>
  );
};

export default memo(Target);
