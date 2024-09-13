import { Entity } from "@backstage/catalog-model";

export {
  Actions,
  EntityTabPortContent,
  HomePage,
  PortInformationCard,
  portPlugin,
  ScorecardCard,
  ScorecardsPage,
} from "./plugin";

export const isPortDataAvailable = (entity: Entity) => {
  return !!entity.metadata?.annotations?.["getport.io/service-name"];
};

export { useEntityRoutes } from "./hooks/useEntityRoutes";
