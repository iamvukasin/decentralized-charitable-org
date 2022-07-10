import { FC, memo } from 'react';
import Wallet from '../Wallet';
import './NavigationBar.scss';

const NavigationBar: FC = () => (
  <div className="navigation-bar">
    <h1 className="navigation-bar__title">
      <a href="/">DCO</a>
    </h1>
    <Wallet />
  </div>
);

export default memo(NavigationBar);
