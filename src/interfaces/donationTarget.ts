import BN from 'bn.js';

interface DonationTarget {
  id: string;
  title: string;
  description: string;
  deadline: number;
  collected: BN;
  goal: BN;
}

export default DonationTarget;
