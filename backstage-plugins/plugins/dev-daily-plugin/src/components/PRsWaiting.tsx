import { Table, TableColumn, TableProps } from '@backstage/core-components';
import CheckCircle from '@material-ui/icons/CheckCircle';
import React from 'react';
import { PR } from './Cards';

function PRsWaiting({ prs }: { prs: PR[] }) {
  const actions: TableProps['actions'] = [
    {
      tooltip: 'Approve',
      icon: () => <CheckCircle />,
      onClick: () => console.log('clicked'),
    },
  ];

  const columns: TableColumn[] = [
    { title: 'Title', field: 'title' },
    { title: 'Link', field: 'link' },
    { title: 'Creator', field: 'creator' },
  ];

  return (
    <Table
      columns={columns}
      data={prs}
      actions={actions}
      options={{
        paging: false,
      }}
    />
  );
}

export default PRsWaiting;
