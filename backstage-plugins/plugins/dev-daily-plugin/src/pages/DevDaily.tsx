import { Content, Header, HeaderLabel, Page } from '@backstage/core-components';
import { LinearProgress } from '@material-ui/core';
import { ApiHooks } from '@port-labs/backstage-plugin-framework';
import React from 'react';
import { useOutlet } from 'react-router-dom';
import Cards from '../components/Cards';

const DevDailyPageInner = () => {
  const { data: userInfo, loading } = ApiHooks.useUserInfo();
  const email = userInfo?.spec.profile?.email;
  const name = userInfo?.metadata.name;

  return (
    <Page themeId="tool">
      <Header
        title="Plan My Day"
        subtitle="Information to help developers plan their day"
      >
        <HeaderLabel label="Viewer Email" value={email} />
        <HeaderLabel label="Viewer Name" value={name} />
      </Header>
      <Content>
        {email && name && <Cards email={email} name={name} />}
        {loading && <LinearProgress />}
      </Content>
    </Page>
  );
};

export const DevDailyPage = () => {
  const outlet = useOutlet();

  return <>{outlet || <DevDailyPageInner />}</>;
};
