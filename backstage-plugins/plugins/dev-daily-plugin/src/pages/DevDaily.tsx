import { Content, Header, HeaderLabel, Page } from '@backstage/core-components';
import { LinearProgress } from '@material-ui/core';
import { ApiHooks } from '@port-labs/backstage-plugin-port-frontend';
import React from 'react';
import { useOutlet } from 'react-router-dom';
import Cards from '../components/Cards';

const DevDailyPageInner = () => {
  const { data: userInfo, loading } = ApiHooks.useUserInfo();
  const email = userInfo?.email;

  return (
    <Page themeId="tool">
      <Header
        title="Plan My Day"
        subtitle="Information to help developers plan their day"
      >
        <HeaderLabel label="Viewer Email" value={email} />
      </Header>
      <Content>
        {email && <Cards email={email} />}
        {loading && <LinearProgress />}
      </Content>
    </Page>
  );
};

export const DevDailyPage = () => {
  const outlet = useOutlet();

  return <>{outlet || <DevDailyPageInner />}</>;
};
