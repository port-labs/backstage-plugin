import { EntityLayout } from '@backstage/plugin-catalog';
import { groupBy } from 'lodash';
import React, { useMemo } from 'react';
import { EntityTabPortContent } from '../features/EntityTabPortContent/EntityTabPortContent';
import { useSearchQuery } from './api-hooks';
import { useServiceName } from './useServiceName';

const SERVICE_BLUEPRINT_ID = 'service';

export const useEntityRoutes = () => {
  const serviceName = useServiceName();

  const { searchQuery } = useMemo(
    () => ({
      searchQuery: serviceName
        ? {
            combinator: 'and',
            rules: [
              {
                operator: 'relatedTo',
                blueprint: SERVICE_BLUEPRINT_ID,
                value: serviceName,
              },
            ],
          }
        : {},
    }),
    [serviceName],
  );

  const { data, loading } = useSearchQuery(searchQuery);
  const groupedData = useMemo(() => {
    return groupBy(data, 'blueprint');
  }, [data]);

  const routes = useMemo(() => {
    return Object.entries(groupedData)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([blueprint, entities]) => (
        <EntityLayout.Route path={`/port/${blueprint}`} title={blueprint}>
          <EntityTabPortContent
            blueprint={blueprint}
            entities={entities}
            isLoading={loading}
          />
        </EntityLayout.Route>
      ));
  }, [groupedData, loading]);

  return routes;
};
