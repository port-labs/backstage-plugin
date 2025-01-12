import { Content } from '@backstage/core-components';
import { Grid, LinearProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useInitiatives } from '../hooks/useInitiatives';
import { usePlugins } from '../hooks/usePlugins';
import { InitiativesCharts } from './InitiativesCharts';
import { PluginsTable } from './PluginsTable';

export function InitiativesPage() {
  const { stats, loading: statsLoading, error: statsError } = useInitiatives();
  const {
    plugins,
    loading: pluginsLoading,
    error: pluginsError,
  } = usePlugins();

  const error = statsError || pluginsError;
  const loading = statsLoading || pluginsLoading;

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error fetching data: {statsError?.message ?? pluginsError?.message}
      </Typography>
    );
  }

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Content noPadding>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InitiativesCharts stats={stats} />
        </Grid>
        <Grid item xs={12}>
          <PluginsTable
            title="Plugins with the old backend system"
            plugins={plugins.filter(
              plugin => plugin.scorecards['New Backend Adoption'] !== 'Gold',
            )}
            loading={loading}
            options={{
              search: false,
              paging: false,
            }}
          />
        </Grid>
      </Grid>
    </Content>
  );
}
