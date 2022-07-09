import { FC, memo } from 'react';
import './ProgressBar.scss';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: FC<ProgressBarProps> = props => {
  const { value } = props;

  return (
    <div className="progress-bar">
      <div className="progress-bar__progress" style={{ right: `${(1 - value) * 100}%` }} />
    </div>
  );
};

export default memo(ProgressBar);
