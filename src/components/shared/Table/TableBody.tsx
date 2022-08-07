import { FC, PropsWithChildren } from 'react';

const TableBody: FC<PropsWithChildren> = props => {
  const { children } = props;

  return <tbody className="table__body">{children}</tbody>;
};

export default TableBody;
