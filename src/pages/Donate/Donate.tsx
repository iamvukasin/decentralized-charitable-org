import { FC } from 'react';
import { Target } from '../../components';
import './Donate.scss';

const Donate: FC = () => {
  return (
    <div className="donate">
      <div className="donate__info">
        <h1 className="donate__title">Title</h1>
        <p className="donate__description">Lorem ipsum</p>
      </div>
      <div className="donate__side-box">
        <Target id="1" collected={2.5} goal={6} currency="ETH" onDonate={() => {}} />
      </div>
    </div>
  );
};

export default Donate;
