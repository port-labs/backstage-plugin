import {
  createApiRef,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { PortAPI } from '@port-labs/backstage-plugin-framework';
import { rootRouteRef } from './routes';

export const portApiRef = createApiRef<PortAPI>({
  id: 'plugin.port.service',
});

export const devexSurveyPlugin = createPlugin({
  id: 'devex-survey-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const DevexSurveyPage = devexSurveyPlugin.provide(
  createRoutableExtension({
    name: 'DevexSurveyPage',
    component: () => import('./pages/router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);
