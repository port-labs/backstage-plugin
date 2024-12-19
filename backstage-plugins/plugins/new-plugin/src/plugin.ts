import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const newPluginPlugin = createPlugin({
  id: 'new-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const NewPluginPage = newPluginPlugin.provide(
  createRoutableExtension({
    name: 'NewPluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
