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
          <TableHeaderCell>Tx</TableHeaderCell>
          <TableHeaderCell>Donator</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation, index) => (
          <TableRow key={index}>
            <TableCell>
              <a href={`https://goerli.voyager.online/tx/${donation.tx}`} target="_blank">
                <span className="donations-for-target-table__transaction">{`${donation.tx.slice(
                  0,
                  10,
                )}...${donation.tx.slice(-8)}`}</span>
              </a>
            </TableCell>
            <TableCell>
              <span className="donations-for-target-table__donator">{`${donation.donator.slice(
                0,
                10,
              )}...${donation.donator.slice(-8)}`}</span>
            </TableCell>
            <TableCell>{formatBN(donation.amount, DEFAULT_PRECISION, true)} ETH</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DonationsForTargetTable;
