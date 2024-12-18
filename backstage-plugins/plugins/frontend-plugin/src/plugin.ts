import {
  configApiRef,
  createApiFactory,
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
  fetchApiRef,
  identityApiRef,
} from '@backstage/core-plugin-api';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { PortAPI, portApiRef } from './api';
import { rootRouteRef, settingsRouteRef } from './routes';

export const portPlugin = createPlugin({
  id: 'port',
  apis: [
    createApiFactory({
      api: portApiRef,
      deps: {
        fetchApi: fetchApiRef,
        configApi: configApiRef,
        identityApi: identityApiRef,
        catalogApi: catalogApiRef,
      },
      factory: ({ fetchApi, configApi, identityApi, catalogApi }) =>
        new PortAPI({ fetchApi, configApi, identityApi, catalogApi }),
    }),
  ],
  routes: {
    root: rootRouteRef,
  },
});

export const EntityTabPortContent = portPlugin.provide(
  createComponentExtension({
    name: 'EntityTabPortContent',
    component: {
      lazy: () =>
        import('./features/EntityTabPortContent/EntityTabPortContent').then(
          m => m.EntityTabPortContent,
        ),
    },
  }),
);

export const ScorecardCard = portPlugin.provide(
  createComponentExtension({
    name: 'ScorecardCard',
    component: {
      lazy: () =>
        import('./features/Scorecards/ScorecardCard').then(m => m.default),
    },
  }),
);

export const Actions = portPlugin.provide(
  createComponentExtension({
    name: 'Actions',
    component: {
      lazy: () => import('./features/Actions/Actions').then(m => m.Actions),
    },
  }),
);

export const PortInformationCard = portPlugin.provide(
  createComponentExtension({
    name: 'PortInformationCard',
    component: {
      lazy: () =>
        import('./features/PortInformationCard/PortInformationCard').then(
          m => m.default,
        ),
    },
  }),
);

export const ScorecardsPage = portPlugin.provide(
  createRoutableExtension({
    name: 'ScorecardsPage',
    component: () => import('./pages/scorecards').then(m => m.ScorecardsPage),
    mountPoint: rootRouteRef,
  }),
);

export const SettingsPage = portPlugin.provide(
  createRoutableExtension({
    name: 'SettingsPage',
    component: () => import('./pages/settings/').then(m => m.SettingsPage),
    mountPoint: settingsRouteRef,
  }),
);
