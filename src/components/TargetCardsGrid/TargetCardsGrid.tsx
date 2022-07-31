import { FC, memo, PropsWithChildren } from 'react';
import './TargetCardsGrid.scss';

const TargetCardsGrid: FC<PropsWithChildren> = props => {
  const { children } = props;

  return <div className="target-cards-grid">{children}</div>;
};

export default memo(TargetCardsGrid);
