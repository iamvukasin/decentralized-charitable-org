import { FC, PropsWithChildren } from 'react';

const TableHeaderCell: FC<PropsWithChildren> = props => {
  const { children } = props;

  return <th className="table__header-cell">{children}</th>;
};

export default TableHeaderCell;
