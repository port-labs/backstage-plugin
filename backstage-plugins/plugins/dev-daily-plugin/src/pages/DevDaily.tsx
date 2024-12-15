import { Content, Header, Page } from '@backstage/core-components';
import React from 'react';
import { useOutlet } from 'react-router-dom';
import Cards from '../components/Cards';

const DevDailyPageInner = () => {
  return (
    <Page themeId="tool">
      <Header
        title="Plan My Day"
        subtitle="Information to help developers plan their day"
      />
      <Content>
        <Cards />
      </Content>
    </Page>
  );
};

export const DevDailyPage = () => {
  const outlet = useOutlet();

  return <>{outlet || <DevDailyPageInner />}</>;
};
