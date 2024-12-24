import { InfoCard, LinkButton } from '@backstage/core-components';
import { List } from '@material-ui/core';
import React from 'react';
import { ApiHooks } from '../../../index';
import { IntegrationListItem } from './IntegrationListItem';
import { ListLoadingSkeleton } from './ListLoadingSkeleton';

function AddIntegrationButton() {
  return (
    <LinkButton
      variant="contained"
      color="primary"
      to="https://app.getport.io/settings/data-sources?section=exporters"
    >
      Add integration
    </LinkButton>
  );
}

export function IntegrationsTable() {
  const { data, loading, error } = ApiHooks.useIntegrationsList();

  if (loading) {
    return <ListLoadingSkeleton />;
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <InfoCard
      title="Integrations list"
      noPadding
      actions={[<AddIntegrationButton key="add-integration" />]}
    >
      <List style={{ maxHeight: 300, overflow: 'auto' }}>
        {data.map(integration => (
          <IntegrationListItem
            key={integration.installationId}
            integration={integration}
          />
        ))}
      </List>
    </InfoCard>
  );
}
