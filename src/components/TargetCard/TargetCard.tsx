import { FC, memo, useMemo } from 'react';
import { DonationTarget } from '../../interfaces';
import Target from '../Target';

import './TargetCard.scss';

type TargetCardProps = DonationTarget;

const TargetCard: FC<TargetCardProps> = props => {
  const { id, title, deadline, description, collected, goal } = props;

  const trimmedDescription = useMemo(() => description.slice(0, 200) + '...', [description]);

  return (
    <div className="target-card">
      <h2 className="target-card__title">{title}</h2>
      <p className="target-card__description">{trimmedDescription}</p>
      <Target id={id} deadline={deadline} collected={collected} goal={goal} currency="ETH" />
    </div>
  );
};

export default memo(TargetCard);
