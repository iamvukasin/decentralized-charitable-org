import { FC, memo } from 'react';
import Target from '../Target';

import './TargetCard.scss';

interface TargetCardProps {
  title: string;
  description: string;
}

const TargetCard: FC<TargetCardProps> = props => {
  const { title, description } = props;

  return (
    <div className="target-card">
      <h2 className="target-card__title">{title}</h2>
      <p className="target-card__description">{description}</p>
      <Target collected={100} goal={200} currency="ETH" />
    </div>
  );
};

export default memo(TargetCard);
