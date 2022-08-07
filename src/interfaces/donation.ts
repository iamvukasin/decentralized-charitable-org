import BN from 'bn.js';

interface Donation {
  donator: string;
  asset: string;
  target: number;
  amount: BN;
}

export default Donation;
