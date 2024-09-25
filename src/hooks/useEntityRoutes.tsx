import { EntityLayout } from "@backstage/plugin-catalog";
import { groupBy } from "lodash";
import React, { useMemo } from "react";
import { EntityTabPortContent } from "..";
import ScorecardCard from "../features/Scorecards/ScorecardCard";
import useSearchQuery from "./api-hooks/useSearchQuery";
import { useServiceName } from "./useServiceName";

const SERVICE_BLUEPRINT_ID = "service";

export const useEntityRoutes = () => {
  const serviceName = useServiceName();

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
  const groupedData = useMemo(() => {
    return groupBy(data, "blueprint");
  }, [data]);

  const scorecardRoute = useMemo(() => {
    return (
      <EntityLayout.Route path="/port/info" title={`${serviceName} Scorecards`}>
        <ScorecardCard />
      </EntityLayout.Route>
    );
  }, [serviceName]);

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
