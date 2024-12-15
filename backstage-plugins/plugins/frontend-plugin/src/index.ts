import { Entity } from '@backstage/catalog-model';
import { PortAPI, portApiRef } from './api';

export {
  Actions,
  EntityTabPortContent,
  PortInformationCard,
  portPlugin,
  ScorecardCard,
  ScorecardsPage,
} from './plugin';

export const isPortDataAvailable = (entity: Entity) => {
  return !!entity.metadata?.annotations?.['getport.io/service-name'];
};

export { useEntityRoutes } from './hooks/useEntityRoutes';

export { PortAPI, portApiRef };
