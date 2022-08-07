import { FC, PropsWithChildren } from 'react';

import './Table.scss';

const Table: FC<PropsWithChildren> = props => {
  const { children } = props;

  return <table className="table">{children}</table>;
};

export default Table;
