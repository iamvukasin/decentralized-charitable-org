import { FC, useCallback, useState } from 'react';
import { useWalletAccount } from '../../hooks';
import { OrganizationService } from '../../services';
import { Button, NumberInput } from '../shared';
import Modal, { ModalProps } from '../shared/Modal';

import './DonateOrgModal.scss';

interface DonateOrgModalProps extends ModalProps {}

type DonationVariant = 'equally' | 'bestfit' | 'priority';

const DonateOrgModal: FC<DonateOrgModalProps> = props => {
  const { open, onClose } = props;
  const [account] = useWalletAccount();
  const [amount, setAmount] = useState(0);
  const [donationVariant, setDonationVariant] = useState<DonationVariant>('priority');

  const handleDonation = useCallback(() => {
    if (!account) {
      return;
    }

    switch (donationVariant) {
      case 'priority':
        OrganizationService.priorityDonate(account, amount);
        break;

      case 'equally':
        OrganizationService.donateEqually(account, amount);
        break;

      case 'bestfit':
        OrganizationService.bestFitDonate(account, amount);
        break;
    }

    setTimeout(() => {
      setDonationVariant('priority');
      setAmount(0);
    }, 750);
  }, [account, amount, donationVariant, onClose]);

  return (
    <Modal className="donate-org-modal" open={open} onClose={onClose}>
      <NumberInput disabled={account === null} onValueChange={setAmount} />
      <div className="donate-org-modal__choices">
        <label>
          <input
            type="radio"
            checked={donationVariant === 'priority'}
            value="priority"
            onChange={() => setDonationVariant('priority')}
          />
          Most urgent
        </label>
        <label>
          <input
            type="radio"
            checked={donationVariant === 'equally'}
            value="equally"
            onChange={() => setDonationVariant('equally')}
          />
          Split equally
        </label>
        <label>
          <input
            type="radio"
            checked={donationVariant === 'bestfit'}
            value="bestfit"
            onChange={() => setDonationVariant('bestfit')}
          />
          Best fit
        </label>
      </div>
      <div className="donate-org-modal__button-container">
        <Button variant="primary" onClick={handleDonation} disabled={account === null || amount <= 0}>
          Donate
        </Button>
      </div>
    </Modal>
  );
};

export default DonateOrgModal;
