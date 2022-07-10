import { FC, memo } from 'react';
import { DonationTarget } from '../../interfaces';
import Target from '../Target';

import './TargetCard.scss';

type TargetCardProps = DonationTarget;

const TargetCard: FC<TargetCardProps> = props => {
  const { id, title, description, collected, goal } = props;

  return (
    <div className="target-card">
      <h2 className="target-card__title">{title}</h2>
      <p className="target-card__description">{description}</p>
      <Target id={id} collected={collected} goal={goal} currency="ETH" />
    </div>
  );
};

export default memo(TargetCard);
