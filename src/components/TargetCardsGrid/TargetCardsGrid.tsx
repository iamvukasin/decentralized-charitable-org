import { FC } from 'react';
import './TargetCardsGrid.scss';

const TargetCardsGrid: FC = props => {
  const { children } = props;

  return <div className="target-cards-grid">{children}</div>;
};

export default TargetCardsGrid;
