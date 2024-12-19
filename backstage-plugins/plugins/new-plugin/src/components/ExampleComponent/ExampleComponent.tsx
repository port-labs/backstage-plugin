import { Content, Header, HeaderLabel, Page } from '@backstage/core-components';
import { Typography } from '@material-ui/core';
import React from 'react';

export function ExampleComponent() {
  return (
    <Page themeId="tool">
      <Header title="Welcome to new-plugin!" subtitle="Optional subtitle">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <Typography variant="body1">This is a new plugin.</Typography>
      </Content>
    </Page>
  );
}
