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

export const devDailyPluginPlugin = createPlugin({
  id: 'dev-daily-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const DevDailyPluginPage = devDailyPluginPlugin.provide(
  createRoutableExtension({
    name: 'DevDailyPluginPage',
    component: () => import('./pages/DevDaily').then(m => m.DevDailyPage),
    mountPoint: rootRouteRef,
  }),
);
