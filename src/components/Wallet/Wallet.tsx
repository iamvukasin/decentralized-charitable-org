import { connect } from '@argent/get-starknet';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { AccountInterface } from 'starknet';
import { useWalletAccount } from '../../hooks';
import { Button } from '../shared';
import './Wallet.scss';

const Wallet: FC = () => {
  const [account, setAccount] = useWalletAccount();
  const [balance, setBalance] = useState<any | null>(null);

  const handleWalletConnect = useCallback(async () => {
    const starknet = await connect();

    if (!starknet) {
      // User rejected wallet selection or silent connect found nothing
      return;
    }

    await starknet.enable();

    setAccount(starknet.account);
  }, []);

  const shortenedWalletAddress = useMemo(
    () => (account?.address ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}` : null),
    [account],
  );

  return (
    <div className="wallet">
      {!account && (
        <Button variant="neutral" onClick={handleWalletConnect}>
          Connect Wallet
        </Button>
      )}
      {account && shortenedWalletAddress && (
        <div className="wallet__info">
          <div className="wallet__address">{shortenedWalletAddress}</div>
        </div>
      )}
      {balance}
    </div>
  );
};

export default memo(Wallet);
