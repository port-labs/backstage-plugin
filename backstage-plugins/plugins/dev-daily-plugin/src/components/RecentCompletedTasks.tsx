import { Table, TableColumn } from '@backstage/core-components';
import { Chip } from '@material-ui/core';
import React from 'react';
import { Task } from './Cards';

function RecentCompletedTasks({ tasks }: { tasks: Task[] }) {
  const columns: TableColumn[] = [
    { title: 'Title', field: 'title' },
    {
      title: 'Status',
      field: 'status',
      render: (row: any) => (
        <Chip label={row.status} style={{ backgroundColor: 'lightgreen' }} />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={tasks}
      options={{
        paging: false,
      }}
    />
  );
}

export default RecentCompletedTasks;
