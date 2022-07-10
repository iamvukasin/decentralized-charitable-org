import { FC } from 'react';
import { DonateBox } from '../../components';
import { DonationTarget } from '../../interfaces';
import './Donate.scss';

const Donate: FC = () => {
  const target: DonationTarget = {
    id: '1',
    title: 'Title',
    description: 'Lorem ipsum',
    collected: 1,
    goal: 4,
  };

  return (
    <div className="donate">
      <div className="donate__info">
        <h1 className="donate__title">{target.title}</h1>
        <p className="donate__description">{target.description}</p>
      </div>
      <DonateBox target={target} />
    </div>
  );
};

export default Donate;
