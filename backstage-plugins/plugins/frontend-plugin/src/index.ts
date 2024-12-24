import { Entity } from '@backstage/catalog-model';
import { PortAPI, portApiRef } from './api';
import * as ApiHooks from './hooks/api-hooks';

export {
  Actions,
  EntityTabPortContent,
  PortInformationCard,
  portPlugin,
  ScorecardCard,
  ScorecardsPage,
  SettingsPage,
} from './plugin';

export const isPortDataAvailable = (entity: Entity) => {
  return !!entity.metadata?.annotations?.['getport.io/service-name'];
};

export { useEntityRoutes } from './hooks/useEntityRoutes';

export { ApiHooks, PortAPI, portApiRef };
