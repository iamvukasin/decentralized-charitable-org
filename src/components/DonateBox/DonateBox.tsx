import { FC, memo, useCallback, useState } from 'react';
import { useWalletAccount } from '../../hooks';
import { DonationTarget } from '../../interfaces';
import { OrganizationService } from '../../services';
import { NumberInput } from '../shared';
import Target from '../Target';
import './DonateBox.scss';

interface DonateBoxProps {
  target: DonationTarget;
}

const DonateBox: FC<DonateBoxProps> = props => {
  const { target } = props;
  const { id, collected, goal } = target;
  const [account] = useWalletAccount();
  const [amount, setAmount] = useState<number | null>(null);

  const disabled = account === null || amount === null;

  const handleDonate = useCallback(() => {
    if (disabled) {
      return;
    }

    OrganizationService.donate(account, parseInt(target.id), amount);
  }, [amount]);

  return (
    <div className="donate-box">
      <NumberInput disabled={disabled} onValueChange={setAmount} />
      <Target id={id} collected={collected} goal={goal} currency="ETH" disabled={disabled} onDonate={handleDonate} />
    </div>
  );
};

export default memo(DonateBox);
