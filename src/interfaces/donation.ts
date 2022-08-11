import BN from 'bn.js';

interface Donation {
  tx: string;
  donator: string;
  asset: string;
  target: number;
  amount: BN;
}

export default Donation;
