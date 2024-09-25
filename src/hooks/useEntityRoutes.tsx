import { EntityLayout } from "@backstage/plugin-catalog";
import { useEntity } from "@backstage/plugin-catalog-react";
import { groupBy } from "lodash";
import React, { useMemo } from "react";
import { EntityTabPortContent } from "..";
import useEntityQuery from "./useSearchQuery/useEntityQuery";
import useSearchQuery from "./useSearchQuery/useSearchQuery";

const SERVICE_BLUEPRINT_ID = "service";

export const useEntityRoutes = () => {
  const { entity } = useEntity();
  const serviceName = entity.metadata.annotations?.["getport.io/service-name"];

  const { searchQuery } = useMemo(
    () => ({
      searchQuery: serviceName
        ? {
            combinator: "and",
            rules: [
              {
                operator: "relatedTo",
                blueprint: SERVICE_BLUEPRINT_ID,
                value: serviceName,
              },
            ],
          }
        : {},
    }),
    [serviceName]
  );

  const { data, isLoading } = useSearchQuery(searchQuery);
  const { data: entityData } = useEntityQuery(
    serviceName,
    SERVICE_BLUEPRINT_ID
  );

  const groupedData = useMemo(() => {
    return groupBy(data, "blueprint");
  }, [data]);

  const scorecardRoute = useMemo(() => {
    return (
      <EntityLayout.Route
        path={`/port/info`}
        title={serviceName + " Scorecards"}
      >
        {entityData ? JSON.stringify(entityData) : "Loading..."}
      </EntityLayout.Route>
    );
  });

  const routes = useMemo(() => {
    return Object.entries(groupedData)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([blueprint, entities]) => (
        <EntityLayout.Route path={`/port/${blueprint}`} title={blueprint}>
          <EntityTabPortContent
            blueprint={blueprint}
            entities={entities}
            isLoading={isLoading}
          />
        </EntityLayout.Route>
      ));
  }, [groupedData, isLoading]);

  return [scorecardRoute, ...routes];
};
