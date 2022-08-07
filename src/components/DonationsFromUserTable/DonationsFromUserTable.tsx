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
          <TableHeaderCell>Target</TableHeaderCell>
          <TableHeaderCell>Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation, index) => (
          <TableRow key={index}>
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
