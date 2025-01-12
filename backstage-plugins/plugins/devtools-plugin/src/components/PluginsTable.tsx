import { Table, TableProps } from '@backstage/core-components';
import { Typography } from '@material-ui/core';
import StopIcon from '@material-ui/icons/CancelRounded';
import React from 'react';
import { Plugin } from '../hooks/usePlugins';

type PluginsTableProps = {
  title: string;
  plugins: Plugin[];
  loading: boolean;
  options?: TableProps['options'];
};
export const getLevelEmoji = (
  level: 'Bronze' | 'Silver' | 'Gold' | 'Basic',
) => {
  switch (level) {
    case 'Bronze':
      return '🥉';
    case 'Silver':
      return '🥈';
    case 'Gold':
      return '🥇';
    case 'Basic':
    default:
      return '🚫';
  }
};

export function Chip({
  label,
  color,
  backgroundColor,
}: {
  label: string;
  color: string;
  backgroundColor: string;
}) {
  return (
    <Typography
      variant="body2"
      style={{
        color,
        backgroundColor,
        padding: '4px 8px',
        borderRadius: '16px',
        display: 'inline-block',
      }}
    >
      {label}
    </Typography>
  );
}

export function PluginsTable({
  title,
  plugins,
  loading,
  options,
}: PluginsTableProps) {
  const columns = [
    {
      title: 'Plugin Name',
      field: 'title',
    },
    {
      title: 'Version',
      field: 'version',
    },
    {
      title: 'Status',
      field: 'status',
      render: (rowData: Plugin) => (
        <Chip
          color={rowData.status === 'Active' ? '#046B15' : '#6F2518'}
          backgroundColor={
            rowData.status === 'Active'
              ? 'rgba(79, 205, 68, 0.3)'
              : 'rgba(255, 111, 85, 0.3)'
          }
          label={rowData.status}
        />
      ),
    },
    {
      title: 'Type',
      field: 'type',
      render: (rowData: Plugin) => (
        <Chip
          color={''}
          backgroundColor={
            rowData.type === 'frontend-plugin'
              ? '#d7d6ff'
              : rowData.type === 'backend-plugin'
              ? '#c7ffe0'
              : '#dbdbdb'
          }
          label={rowData.type}
        />
      ),
    },
    {
      title: 'Owner',
      field: 'owner',
    },
    ...Object.keys(plugins[0]?.scorecards ?? {}).map(scorecardName => ({
      title: scorecardName,
      field: scorecardName,
      render: (rowData: Plugin) => (
        <Typography variant="body2">
          {getLevelEmoji(rowData.scorecards[scorecardName] as any)}
        </Typography>
      ),
    })),
    {
      title: 'Datadog Uptime (days)',
      field: 'datadog_uptime',
    },
  ];

  return (
    <Table
      title={title}
      columns={columns}
      data={plugins}
      isLoading={loading}
      options={
        options ?? {
          search: true,
          paging: true,
          padding: 'dense',
          sorting: true,
          columnResizable: true,
          fixedColumns: {
            left: 1,
          },
          pageSize: 7,
        }
      }
      actions={[
        (rowData: Plugin) => ({
          icon: StopIcon,
          tooltip: 'Stop',
          disabled: rowData.status === 'Not Running',
          onClick: rowData => {
            console.log(rowData);
          },
        }),
      ]}
    />
  );
}
