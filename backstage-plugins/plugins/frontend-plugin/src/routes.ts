import { createRouteRef, createSubRouteRef } from "@backstage/core-plugin-api";

export const rootRouteRef = createRouteRef({
  id: "port-scorecards",
});

export const scorecardsInitiativesRouteRef = createSubRouteRef({
  id: "scorecards-initiatives",
  parent: rootRouteRef,
  path: "/initiatives",
});
