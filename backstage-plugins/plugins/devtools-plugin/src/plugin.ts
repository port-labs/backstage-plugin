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

export const devtoolsPlugin = createPlugin({
  id: 'devtools-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const DevToolsPage = devtoolsPlugin.provide(
  createRoutableExtension({
    name: 'DevToolsPage',
    component: () => import('./pages/DevToolsPage').then(m => m.DevToolsPage),
    mountPoint: rootRouteRef,
  }),
);
