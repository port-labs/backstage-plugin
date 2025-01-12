import {
  Content,
  Header,
  Page,
  TabbedLayout,
} from '@backstage/core-components';
import { Typography } from '@material-ui/core';
import React from 'react';
import { InitiativesPage } from '../components/InitiativesPage';
import { PluginsTable } from '../components/PluginsTable';
import { usePlugins } from '../hooks/usePlugins';

export function DevToolsPage() {
  const { plugins, loading, error } = usePlugins();

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error fetching plugins: {error.message}
      </Typography>
    );
  }

  return (
    <Page themeId="other">
      <Header
        title="Dev Tools"
        subtitle="View all plugins and their scorecards"
      />
      <TabbedLayout>
        <TabbedLayout.Route path="/" title="Plugins List">
          <Content noPadding>
            <PluginsTable
              title="All Plugins"
              plugins={plugins}
              loading={loading}
            />
          </Content>
        </TabbedLayout.Route>
        <TabbedLayout.Route path="/initiatives" title="Initiatives">
          <InitiativesPage />
        </TabbedLayout.Route>
      </TabbedLayout>
    </Page>
  );
}
