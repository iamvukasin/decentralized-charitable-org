import { FC, PropsWithChildren } from 'react';

const TableCell: FC<PropsWithChildren> = props => {
  const { children } = props;

  return <td className="table__cell">{children}</td>;
};

export default TableCell;
