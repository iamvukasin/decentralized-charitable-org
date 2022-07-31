import { connect } from '@argent/get-starknet';
import { FC, memo, useCallback, useMemo } from 'react';
import { useBalance, useWalletAccount } from '../../hooks';
import { formatBN } from '../../utils';
import { Button, Loading } from '../shared';
import './Wallet.scss';

const Wallet: FC = () => {
  const [account, setAccount] = useWalletAccount();
  const balance = useBalance();

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
      {shortenedWalletAddress && balance && (
        <div className="wallet__info">
          <div className="wallet__address">{shortenedWalletAddress}</div>
          <div className="wallet__balance">{formatBN(balance, 4)} ETH</div>
        </div>
      )}
      {shortenedWalletAddress === null || (balance === null && <Loading size="small" />)}
    </div>
  );
};

export default memo(Wallet);
