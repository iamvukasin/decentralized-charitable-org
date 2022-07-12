import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { DonateBox } from '../../components';
import { useTargets } from '../../hooks';
import './Donate.scss';

const Donate: FC = () => {
  const targets = useTargets();
  const { id } = useParams();
  const target = targets?.find(target => target.id === id);

  if (!target) {
    return null;
  }

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
