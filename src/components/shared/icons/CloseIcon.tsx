import { FC, memo } from 'react';

const CloseIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 378.303 378.303">
    <polygon points="378.303,28.285 350.018,0 189.151,160.867 28.285,0 0,28.285 160.867,189.151 0,350.018   28.285,378.302 189.151,217.436 350.018,378.302 378.303,350.018 217.436,189.151 " />
  </svg>
);

export default memo(CloseIcon);
