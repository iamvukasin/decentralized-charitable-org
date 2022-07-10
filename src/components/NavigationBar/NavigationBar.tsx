import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import Wallet from '../Wallet';
import './NavigationBar.scss';

const NavigationBar: FC = () => (
  <div className="navigation-bar">
    <h1 className="navigation-bar__title">
      <Link to="/">DCO</Link>
    </h1>
    <Wallet />
  </div>
);

export default memo(NavigationBar);
