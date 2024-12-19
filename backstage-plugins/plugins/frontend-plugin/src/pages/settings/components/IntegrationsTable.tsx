import { List } from '@material-ui/core';
import React from 'react';
import { ApiHooks } from '../../../index';
import { IntegrationListItem } from './IntegrationListItem';
import { ListLoadingSkeleton } from './ListLoadingSkeleton';

export function IntegrationsTable() {
  const { data, loading, error } = ApiHooks.useIntegrationsList();

  if (loading) {
    return <ListLoadingSkeleton />;
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
