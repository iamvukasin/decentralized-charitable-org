import BN from 'bn.js';

interface DonationTarget {
  id: string;
  title: string;
  description: string;
  collected: BN;
  goal: BN;
}

export default DonationTarget;
