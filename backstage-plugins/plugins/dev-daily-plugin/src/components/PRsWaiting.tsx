import { Table, TableColumn, TableProps } from '@backstage/core-components';
import CheckCircle from '@material-ui/icons/CheckCircle';
import React from 'react';

function PRsWaiting() {
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
  ];

  const data = [
    { title: 'PR 1', link: 'https://github.com/org/repo/pull/1' },
    { title: 'PR 2', link: 'https://github.com/org/repo/pull/2' },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      actions={actions}
      options={{
        paging: false,
      }}
    />
  );
}

export default PRsWaiting;
