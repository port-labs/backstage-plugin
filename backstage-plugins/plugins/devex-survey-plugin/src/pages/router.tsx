import {
  Header,
  HeaderActionMenu,
  HeaderLabel,
  Page,
} from '@backstage/core-components';
import { useRouteRef } from '@backstage/core-plugin-api';
import { ApiHooks } from '@port-labs/backstage-plugin-framework';
import React from 'react';
import { Route, Routes } from 'react-router';
import { adminRouteRef } from '../routes';
import { AdminPage } from './admin';
import { SurveyPage } from './survey';

export const Router = () => {
  const { data: userInfo } = ApiHooks.useUserInfo();
  const adminRouteRefPath = useRouteRef(adminRouteRef);

  return (
    <Page themeId="tool">
      <Header title="Developer Experience Survey">
        <HeaderLabel
          label="Viewer Email"
          value={userInfo?.spec.profile?.email}
        />
        <HeaderLabel label="Viewer Name" value={userInfo?.metadata.name} />
        <HeaderActionMenu
          actionItems={[
            {
              label: 'Admin view',
              onClick: () => {
                window.location.href = adminRouteRefPath();
              },
            },
          ]}
        />
      </Header>

      <Routes>
        <Route path="/" element={<SurveyPage />} />
        <Route path={adminRouteRef.path} element={<AdminPage />} />
      </Routes>
    </Page>
  );
};
