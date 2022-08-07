import { FC, useEffect } from 'react';
import { DEFAULT_PRECISION } from '../../constants';
import { useDonationsForTarget } from '../../hooks';
import { formatBN } from '../../utils';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '../shared';
import './DonationsForTargetTable.scss';

interface DonationsForTargetTableProps {
  target: number;
}

const DonationsForTargetTable: FC<DonationsForTargetTableProps> = props => {
  const { target } = props;
  const [donations, setDonationsTarget] = useDonationsForTarget();

  useEffect(() => {
    setDonationsTarget(target);
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Donator</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation, index) => (
          <TableRow key={index}>
            <TableCell>
              <span className="donations-for-target-table__donator">{donation.donator}</span>
            </TableCell>
            <TableCell>{formatBN(donation.amount, DEFAULT_PRECISION, true)} ETH</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DonationsForTargetTable;
