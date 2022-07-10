interface DonationTarget {
  id: string;
  title: string;
  description: string;
  collected: number;
  goal: number;
}

export default DonationTarget;
