import { FC } from 'react';
import DonationsFromUserTable from '../DonationsFromUserTable';
import Modal, { ModalProps } from '../shared/Modal';

import './UserDonationsModal.scss';

interface UserDonationsModalProps extends ModalProps {}

const UserDonationsModal: FC<UserDonationsModalProps> = props => {
  const { open, onClose } = props;

  return (
    <Modal className="user-donations-modal" open={open} onClose={onClose}>
      <h3 className="user-donations-modal__title">Donations</h3>
      <DonationsFromUserTable onTargetClick={onClose} />
    </Modal>
  );
};

export default UserDonationsModal;
