import { Entity } from "@backstage/catalog-model";

export { EntityTabPortContent, HomePage, portPlugin } from "./plugin";

export const isPortDataAvailable = (entity: Entity) => {
  return !!entity.metadata?.annotations?.["getport.io/service-name"];
};

export { useEntityRoutes } from "./hooks/useEntityRoutes";
