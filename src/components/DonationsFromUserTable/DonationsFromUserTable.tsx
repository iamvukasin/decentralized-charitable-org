import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_PRECISION } from '../../constants';
import { useUserDonations } from '../../hooks';
import { formatBN } from '../../utils';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '../shared';

interface DonationsFromUserTableProps {
  onTargetClick?: () => void;
}

const DonationsFromUserTable: FC<DonationsFromUserTableProps> = props => {
  const { onTargetClick } = props;
  const donations = useUserDonations();

  const handleTargetClick = useCallback(() => {
    onTargetClick?.();
  }, [onTargetClick]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Tx</TableHeaderCell>
          <TableHeaderCell>Target</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation, index) => (
          <TableRow key={index}>
            <TableCell>
              <a href={`https://goerli.voyager.online/tx/${donation.tx}`} target="_blank" onClick={handleTargetClick}>
                {`${donation.tx.slice(0, 6)}...${donation.tx.slice(-4)}`}
              </a>
            </TableCell>
            <TableCell>
              <Link to={`/donate/${donation.target}`} onClick={handleTargetClick}>
                #{donation.target}
              </Link>
            </TableCell>
            <TableCell>{formatBN(donation.amount, DEFAULT_PRECISION, true)} ETH</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DonationsFromUserTable;
