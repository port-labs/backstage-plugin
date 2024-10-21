import {
  CardTab,
  DependencyGraph,
  DependencyGraphTypes,
  TabbedCard,
} from "@backstage/core-components";
import { Grid, makeStyles, useTheme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useMemo } from "react";
import useEntityQuery from "../../hooks/api-hooks/useEntityQuery";
import useSearchQuery from "../../hooks/api-hooks/useSearchQuery";
import { useServiceName } from "../../hooks/useServiceName";
import { DefaultRenderLabel } from "./DefaultRenderLabel";
import { DefaultRenderNode } from "./DefaultRenderNode";
import { EntityEdge, EntityNode } from "./types";

const useStyles = makeStyles(
  (theme) => ({
    graph: {
      width: "100%",
      flex: 1,
      // Right now there is no good way to style edges between nodes, we have to
      // fall back to these hacks:
      "& path": {
        stroke: "black",
      },
      "& path[marker-end]": {
        transition: "filter 0.1s ease-in-out",
      },
      "& path[marker-end]:hover": {
        filter: `drop-shadow(2px 2px 4px ${theme.palette.primary.dark});`,
      },
      "& g[data-testid=label]": {
        transition: "transform 0s",
      },
    },
  }),
  { name: "PluginCatalogGraphEntityRelationsGraph" }
);

const SERVICE_BLUEPRINT_ID = "service";

function PortInformationCard() {
  const classes = useStyles();
  const theme = useTheme();
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
  const { data: entitiesData, error, isLoading } = useSearchQuery(searchQuery);
  const { data: entityData } = useEntityQuery(
    serviceName,
    SERVICE_BLUEPRINT_ID
  );

  const nodes = useMemo((): EntityNode[] => {
    return [
      ...entitiesData.map(
        (entity) =>
          ({
            id: entity.identifier,
            entity: {
              apiVersion: "v1",
              kind: "Port",
              metadata: {
                name: entity.title ?? entity.identifier,
              },
            },
            color: "secondary",
          } as const)
      ),
      {
        id: serviceName ?? "",
        entity: {
          apiVersion: "v1",
          kind: "Port",
          metadata: {
            name: serviceName ?? "",
          },
        },
        color: "primary",
      },
    ] as const;
  }, [entitiesData, serviceName]);

  const edges: EntityEdge[] = useMemo((): EntityEdge[] => {
    if (!serviceName || !entityData?.relations) {
      return [];
    }

    const directEdges: EntityEdge[] = Object.entries(
      entityData.relations
    ).flatMap(([relationType, fromIdentifier]) => {
      if (Array.isArray(fromIdentifier)) {
        return fromIdentifier.map((from) => ({
          to: from,
          from: entityData.identifier,
          label: "visible",
          relations: [relationType],
        }));
      }
      if (!fromIdentifier) {
        return [];
      }

      return {
        to: fromIdentifier,
        from: entityData.identifier,
        label: "visible",
        relations: [relationType],
      };
    });

    return [
      ...entitiesData.flatMap((entity) =>
        Object.entries(entity.relations ?? {}).flatMap(
          ([relationType, fromIdentifier]) => {
            if (Array.isArray(fromIdentifier)) {
              return fromIdentifier.map((from) => ({
                to: from,
                from: entity.identifier,
                label: "visible",
                relations: [relationType],
              })) as EntityEdge[];
            }
            return {
              to: fromIdentifier ?? serviceName,
              from: entity.identifier,
              label: "visible",
              relations: [relationType],
            } as EntityEdge;
          }
        )
      ),
      ...directEdges,
    ];
  }, [entitiesData, serviceName, entityData]);

  const properties = useMemo(() => {
    return entityData?.properties ? Object.entries(entityData.properties) : [];
  }, [entityData]);

  return (
    <TabbedCard title="Port information">
      <CardTab label="Dependency Graph">
        {isLoading && (
          <Alert severity="info" style={{ margin: theme.spacing(2) }}>
            Loading...
          </Alert>
        )}
        {error && (
          <Alert severity="error" style={{ margin: theme.spacing(2) }}>
            {error}
          </Alert>
        )}
        {!isLoading && !error && (
          <DependencyGraph
            nodes={nodes}
            edges={edges}
            renderNode={DefaultRenderNode}
            renderLabel={DefaultRenderLabel}
            direction={DependencyGraphTypes.Direction.LEFT_RIGHT}
            labelPosition={DependencyGraphTypes.LabelPosition.RIGHT}
            zoom="enabled"
            className={classes.graph}
            edgeWeight={10}
            showArrowHeads
            paddingX={theme.spacing(4)}
            paddingY={theme.spacing(4)}
            labelOffset={theme.spacing(1)}
          />
        )}
      </CardTab>
      {properties.length > 0 ? (
        <CardTab label="Properties">
          <Grid container spacing={3} alignItems="stretch">
            {properties.map(([key, value]) => (
              <Grid item md={6}>
                <span>{key}: </span>
                <span style={{ fontWeight: "bold" }}>
                  {JSON.stringify(value)}
                </span>
              </Grid>
            ))}
          </Grid>
        </CardTab>
      ) : (
        <></>
      )}
    </TabbedCard>
  );
}

export default PortInformationCard;
