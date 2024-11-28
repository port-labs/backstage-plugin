import {
  configApiRef,
  createApiFactory,
  createComponentExtension,
  createPlugin,
  fetchApiRef,
} from "@backstage/core-plugin-api";

import { PortAPI, portApiRef } from "./api";

export const portPlugin = createPlugin({
  id: "port",
  apis: [
    createApiFactory({
      api: portApiRef,
      deps: {
        fetchApi: fetchApiRef,
        configApi: configApiRef,
      },
      factory: ({ fetchApi, configApi }) =>
        new PortAPI({ fetchApi, configApi }),
    }),
  ],
});

export const EntityTabPortContent = portPlugin.provide(
  createComponentExtension({
    name: "EntityTabPortContent",
    component: {
      lazy: () =>
        import("./features/EntityTabPortContent/EntityTabPortContent").then(
          (m) => m.EntityTabPortContent
        ),
    },
  })
);

export const ScorecardCard = portPlugin.provide(
  createComponentExtension({
    name: "ScorecardCard",
    component: {
      lazy: () =>
        import("./features/Scorecards/ScorecardCard").then((m) => m.default),
    },
  })
);

export const Actions = portPlugin.provide(
  createComponentExtension({
    name: "Actions",
    component: {
      lazy: () => import("./features/Actions/Actions").then((m) => m.Actions),
    },
  })
);

export const PortInformationCard = portPlugin.provide(
  createComponentExtension({
    name: "PortInformationCard",
    component: {
      lazy: () =>
        import("./features/PortInformationCard/PortInformationCard").then(
          (m) => m.default
        ),
    },
  })
);

export const ScorecardsPage = portPlugin.provide(
  createComponentExtension({
    name: "ScorecardsPage",
    component: {
      lazy: () =>
        import("./pages/scorecards/scorecards").then((m) => m.ScorecardsPage),
    },
  })
);
