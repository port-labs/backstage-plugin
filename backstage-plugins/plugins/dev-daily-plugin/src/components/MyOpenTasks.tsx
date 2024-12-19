import { Table } from '@backstage/core-components';
import { Chip } from '@material-ui/core';
import React from 'react';
import { Task } from './Cards';

function MyOpenTasks({ tasks }: { tasks: Task[] }) {
  return (
    <Table
      columns={[
        { title: 'Title', field: 'title' },
        {
          title: 'Status',
          field: 'status',
          render: (row: any) => (
            <Chip
              label={row.status}
              style={{
                backgroundColor: row.status === 'To Do' ? '' : 'lightyellow',
              }}
            />
          ),
        },
      ]}
      data={tasks}
      options={{
        paging: false,
      }}
    />
  );
}

export default MyOpenTasks;
