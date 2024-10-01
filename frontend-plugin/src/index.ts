import { Entity } from "@backstage/catalog-model";

export {
  Actions,
  EntityTabPortContent,
  HomePage,
  portPlugin,
  ScorecardCard,
  PortDependencyCard,
} from "./plugin";

export const isPortDataAvailable = (entity: Entity) => {
  return !!entity.metadata?.annotations?.["getport.io/service-name"];
};

export { useEntityRoutes } from "./hooks/useEntityRoutes";
