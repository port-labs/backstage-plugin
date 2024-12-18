import { Box, List } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { ApiHooks } from '../../../index';
import { IntegrationListItem } from './IntegrationListItem';

export function IntegrationsTable() {
  const { data, loading, error } = ApiHooks.useIntegrationsList();

  if (loading) {
    return (
      <Box p={2} sx={{ width: '100%' }}>
        <Skeleton variant="text" height={50} />
        <Skeleton variant="text" height={50} />
        <Skeleton variant="text" height={50} />
      </Box>
    );
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <List style={{ maxHeight: 300, overflow: 'auto' }}>
      {data.map(integration => (
        <IntegrationListItem
          key={integration.installationId}
          integration={integration}
        />
      ))}
    </List>
  );
}
