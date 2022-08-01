import { FC, useCallback, useState } from 'react';
import { Button, NumberInput } from '../shared';
import Modal, { ModalProps } from '../shared/Modal';

import './DonateOrgModal.scss';

interface DonateOrgModalProps extends ModalProps {}

type DonationVariant = 'equally' | 'bestfit';

const DonateOrgModal: FC<DonateOrgModalProps> = props => {
  const { open, onClose } = props;
  const [amount, setAmount] = useState(0);
  const [donationVariant, setDonationVariant] = useState<DonationVariant>('equally');

  const handleDonation = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal className="donate-org-modal" open={open} onClose={onClose}>
      <NumberInput onValueChange={setAmount} />
      <div className="donate-org-modal__choices">
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
        <Button variant="primary" onClick={handleDonation} disabled={amount <= 0}>
          Donate
        </Button>
      </div>
    </Modal>
  );
};

export default DonateOrgModal;
