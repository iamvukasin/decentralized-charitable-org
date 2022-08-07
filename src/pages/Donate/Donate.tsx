import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DonateBox, DonationsForTargetTable } from '../../components';
import { useTargets } from '../../hooks';
import './Donate.scss';

const Donate: FC = () => {
  const targets = useTargets();
  const [tableVisible, setTableVisible] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      setTableVisible(true);
    }, 500);
  });

  const numberId = useMemo(() => {
    if (!id) {
      return undefined;
    }

    return parseInt(id);
  }, [id]);

  const target = useMemo(() => targets?.find(target => target.id === id), [id, targets]);

  const deadline = useMemo(() => {
    if (!target) {
      return undefined;
    }

    return new Date(target.deadline).toLocaleDateString('en-GB');
  }, [target]);

  if (numberId === undefined || !target) {
    return null;
  }

  return (
    <div className="donate">
      <div className="donate__info">
        <h1 className="donate__title">{target.title}</h1>
        <span className="donate__deadline">Deadline: {deadline}</span>
        <p className="donate__description">{target.description}</p>
        {tableVisible && <DonationsForTargetTable target={numberId} />}
      </div>
      <div className="donate__donate-box-container">
        <DonateBox target={target} />
      </div>
    </div>
  );
};

export default Donate;
