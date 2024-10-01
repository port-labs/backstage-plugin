import {
  DependencyGraph,
  DependencyGraphTypes,
  InfoCard,
} from "@backstage/core-components";
import { makeStyles, useTheme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useMemo } from "react";
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

function PortDependencyCard() {
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

  const entityData = entitiesData[0];

  const nodes = useMemo((): EntityNode[] => {
    const relations = entityData?.relations;
    if (!relations) {
      return [];
    }

    const objects = Object.values(relations)
      .filter((relation): relation is string[] | string => !!relation)
      .flat();

    return [
      ...objects.map(
        (relation) =>
          ({
            id: relation,
            entity: {
              apiVersion: "v1",
              kind: "Port",
              metadata: {
                name: relation,
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
  }, [entityData, serviceName]);

  const edges: EntityEdge[] = useMemo((): EntityEdge[] => {
    if (!entityData?.relations) {
      return [];
    }

    return Object.entries(entityData.relations)
      .filter((objects): objects is [string, string[]] => !!objects[1])
      .map(([relationName, to]) => {
        if (typeof to === "string") {
          return [[relationName, to]];
        }
        return to.map((to2) => [relationName, to2]);
      })
      .flat()
      .map(([relationName, to]) => ({
        from: serviceName ?? "",
        to: typeof to === "string" ? to : (to ?? [""])[0],
        label: "visible",
        relations: [relationName],
      }));
  }, [entityData, serviceName]);

  return (
    <InfoCard title="Port Dependency Graph" noPadding>
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
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        renderNode={DefaultRenderNode}
        renderLabel={DefaultRenderLabel}
        direction={DependencyGraphTypes.Direction.LEFT_RIGHT}
        labelPosition={DependencyGraphTypes.LabelPosition.RIGHT}
        zoom="enabled"
        className={classes.graph}
        fit="grow"
        edgeWeight={10}
        showArrowHeads
        paddingX={theme.spacing(4)}
        paddingY={theme.spacing(4)}
        labelOffset={theme.spacing(1)}
      />
    </InfoCard>
  );
}

export default PortDependencyCard;
