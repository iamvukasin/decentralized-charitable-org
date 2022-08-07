import { FC, PropsWithChildren } from 'react';

const TableRow: FC<PropsWithChildren> = props => {
  const { children } = props;

  return <tr className="table__row">{children}</tr>;
};

export default TableRow;
