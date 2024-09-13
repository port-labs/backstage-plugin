import { createPlugin, createComponentExtension } from '@backstage/core-plugin-api';
import { rootRouteRef } from './routes.esm.js';

const portPlugin = createPlugin({
  id: "port",
  routes: {
    root: rootRouteRef
  }
});
const EntityTabPortContent = portPlugin.provide(
  createComponentExtension({
    name: "EntityTabPortContent",
    component: {
      lazy: () => import('./features/EntityTabPortContent/EntityTabPortContent.esm.js').then((m) => m.EntityTabPortContent)
    }
  })
);
const HomePage = portPlugin.provide(
  createComponentExtension({
    name: "HomePage",
    component: {
      lazy: () => import('./features/HomePage.esm.js').then((m) => m.HomePage)
    }
  })
);

export { EntityTabPortContent, HomePage, portPlugin };
//# sourceMappingURL=plugin.esm.js.map
