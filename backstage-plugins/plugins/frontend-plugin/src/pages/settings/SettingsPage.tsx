import { Content, InfoCard } from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import React from 'react';
import { BlueprintsTable } from './components/BlueprintsTable';
import { IntegrationsTable } from './components/IntegrationsTable';

export const SettingsPage = () => {
  return (
    <Content noPadding>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InfoCard title="Data models - Blueprints" noPadding>
            <BlueprintsTable />
          </InfoCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoCard title="Integrations list" noPadding>
            <IntegrationsTable />
          </InfoCard>
        </Grid>
      </Grid>
    </Content>
  );
};
