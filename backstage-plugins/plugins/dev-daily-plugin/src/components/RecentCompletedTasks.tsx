import { Table, TableColumn } from '@backstage/core-components';
import React from 'react';
import { Task } from './Cards';

function RecentCompletedTasks({ tasks }: { tasks: Task[] }) {
  const columns: TableColumn[] = [
    { title: 'Title', field: 'title' },
    { title: 'Status', field: 'status' },
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
