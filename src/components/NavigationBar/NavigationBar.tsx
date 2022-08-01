import { FC, memo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWalletAccount } from '../../hooks';
import DonateOrgModal from '../DonateOrgModal';
import { Button } from '../shared';
import Wallet from '../Wallet';
import './NavigationBar.scss';

const NavigationBar: FC = () => {
  const [account] = useWalletAccount();
  const [openDonateOrgModal, setOpenDonateOrgModal] = useState(false);

  const openDonateModal = useCallback(() => setOpenDonateOrgModal(true), []);

  const closeDonateModal = useCallback(() => setOpenDonateOrgModal(false), []);

  return (
    <>
      <div className="navigation-bar">
        <h1 className="navigation-bar__title">
          <Link to="/">DCO</Link>
        </h1>
        <div className="navigation-bar__buttons">
          {account && (
            <Button className="navigation-bar__donate-button" variant="primary" onClick={openDonateModal}>
              Donate
            </Button>
          )}
          <Wallet />
        </div>
      </div>
      <DonateOrgModal open={openDonateOrgModal} onClose={closeDonateModal} />
    </>
  );
};

export default memo(NavigationBar);
