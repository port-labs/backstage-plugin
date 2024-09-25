import {
  createComponentExtension,
  createPlugin,
} from "@backstage/core-plugin-api";

import { rootRouteRef } from "./routes";

export const portPlugin = createPlugin({
  id: "port",
  routes: {
    root: rootRouteRef,
  },
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

export const HomePage = portPlugin.provide(
  createComponentExtension({
    name: "HomePage",
    component: {
      lazy: () => import("./features/HomePage").then((m) => m.HomePage),
    },
  })
);
