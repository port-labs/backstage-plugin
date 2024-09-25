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
    if (!entityData?.scorecards) return null;

    const scorecards = Object.entries(entityData.scorecards).map(
      ([scorecardId, scorecard]) => {
        return {
          name: scorecardId,
          level: scorecard.level as string,
          rules: scorecard.rules.map((rule) => ({
            name: rule.identifier as string,
            status: rule.status as string,
          })),
        };
      }
    );
    return (
      <EntityLayout.Route path="/port/info" title={`${serviceName} Scorecards`}>
        <div>
          {scorecards.map((scorecard) => (
            <div key={scorecard.name}>
              <h1>{scorecard.name}</h1>
              <h3>{scorecard.level}</h3>
              {scorecard.rules.map((rule) => (
                <p key={rule.name}>
                  <span>{rule.name}</span>
                  <span> - {rule.status}</span>
                </p>
              ))}
            </div>
          ))}
        </div>
      </EntityLayout.Route>
    );
  }, [entityData, serviceName]);

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
