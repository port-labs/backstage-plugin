import { Table, TableColumn } from '@backstage/core-components';
import React from 'react';

function RecentCompletedTasks() {
  const columns: TableColumn[] = [
    { title: 'Title', field: 'title' },
    { title: 'Link', field: 'link' },
  ];

  const data = [
    { title: 'Issue 1', link: 'https://github.com/org/repo/issues/1' },
    { title: 'Issue 2', link: 'https://github.com/org/repo/issues/2' },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      options={{
        paging: false,
      }}
    />
  );
}

export default RecentCompletedTasks;
