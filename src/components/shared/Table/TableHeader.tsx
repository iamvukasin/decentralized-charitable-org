import { FC, PropsWithChildren } from 'react';

const TableHeader: FC<PropsWithChildren> = props => {
  const { children } = props;

  return <thead className="table__header">{children}</thead>;
};

export default TableHeader;
