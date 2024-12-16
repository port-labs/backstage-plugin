import { Link, Table, TableProps } from '@backstage/core-components';
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

  return (
    <Table
      columns={[
        { title: 'Title', field: 'title' },
        {
          title: 'Link',
          field: 'link',
          render: (row: any) => <Link to={row.link}>{row.link}</Link>,
        },
        { title: 'Creator', field: 'creator' },
      ]}
      data={prs}
      actions={actions}
      options={{
        paging: false,
      }}
    />
  );
}

export default PRsWaiting;
