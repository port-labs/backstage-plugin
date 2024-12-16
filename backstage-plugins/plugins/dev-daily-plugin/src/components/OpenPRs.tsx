import { Link, Table, TableProps } from '@backstage/core-components';
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

  return (
    <>
      <Table
        columns={[
          { title: 'Title', field: 'title' },
          {
            title: 'Link',
            field: 'link',
            render: (row: any) => <Link to={row.link}>{row.link}</Link>,
          },
          { title: 'Assignees', field: 'assignees' },
        ]}
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
