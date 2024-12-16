import { Table, TableColumn, TableProps } from '@backstage/core-components';
import Send from '@material-ui/icons/Send';
import React from 'react';
import { PR } from './Cards';

type OpenPRsProps = {
  prs: PR[];
};

function OpenPRs({ prs }: OpenPRsProps) {
  const actions: TableProps['actions'] = [
    {
      tooltip: 'Nudge Reviewers in Slack',
      icon: () => <Send />,
      onClick: () => console.log('clicked'),
    },
  ];

  const columns: TableColumn[] = [
    { title: 'Title', field: 'title' },
    {
      title: 'Link',
      field: 'link',
      render: (row: any) => <a href={row.link}>{row.link}</a>,
    },
    { title: 'Assignees', field: 'assignees' },
  ];

  return (
    <>
      <Table
        columns={columns}
        data={prs}
        actions={actions}
        options={{
          paging: false,
        }}
      />
    </>
  );
}

export default OpenPRs;
