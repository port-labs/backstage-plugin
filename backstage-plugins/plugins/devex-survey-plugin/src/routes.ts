import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'devex-survey-plugin',
});

export const adminRouteRef = createSubRouteRef({
  id: 'devex-survey-plugin-admin',
  parent: rootRouteRef,
  path: '/admin',
});
