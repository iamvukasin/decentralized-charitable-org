import { FC, useState } from 'react';
import { DonationTarget } from '../../interfaces';
import { NumberInput } from '../shared';
import Target from '../Target';
import './DonateBox.scss';

interface DonateBoxProps {
  target: DonationTarget;
}

const DonateBox: FC<DonateBoxProps> = props => {
  const { target } = props;
  const { id, collected, goal } = target;
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <div className="donate-box">
      <NumberInput onValueChange={setAmount} />
      <Target id={id} collected={collected} goal={goal} currency="ETH" onDonate={() => {}} />
    </div>
  );
};

export default DonateBox;
