import { Table, TableColumn, TableProps } from '@backstage/core-components';
import Send from '@material-ui/icons/Send';
import React from 'react';

function OpenPRs() {
  const actions: TableProps['actions'] = [
    {
      tooltip: 'Nudge Reviewers in Slack',
      icon: () => <Send />,
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

export default OpenPRs;
