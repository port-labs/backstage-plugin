import { InfoCard } from "@backstage/core-components";
import { useTheme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useEffect, useMemo } from "react";
import useEntityQuery from "../../hooks/api-hooks/useEntityQuery";
import useSearchQuery from "../../hooks/api-hooks/useSearchQuery";
import { useServiceName } from "../../hooks/useServiceName";
import { Edge, Node } from "./types";
import { getLayoutedElements } from "./utils";

const SERVICE_BLUEPRINT_ID = "service";

function GraphView({
  nodes: initialNodes,
  edges: initialEdges,
}: {
  nodes: Node[];
  edges: Edge[];
}) {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    const layouted = getLayoutedElements(nodes, edges, {
      direction: "TB",
    });

    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);

    window.requestAnimationFrame(() => {
      fitView();
    });
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView, nodes, edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      defaultEdgeOptions={{
        type: "smoothstep",
      }}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      proOptions={{ hideAttribution: true }}
      fitView
      fitViewOptions={{
        padding: 0.5,
      }}
    />
  );
}

function PortDependencyCard() {
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

  const nodes: Node[] = useMemo((): Node[] => {
    return [
      ...entitiesData.map(
        (entity): Node => ({
          id: entity.identifier,
          position: {
            x: 0,
            y: 0,
          },
          data: {
            label: entity.title ?? entity.identifier,
            blueprint: entity.blueprint,
            url: `https://app.getport.io/${entity.blueprint}Entity?identifier=${entity.identifier}`,
          },
        })
      ),
      {
        id: serviceName ?? "",
        data: {
          label: serviceName ?? "",
          blueprint: "Port",
          url: `https://app.getport.io/PortEntity?identifier=${serviceName}`,
        },
        position: {
          x: 0,
          y: 0,
        },
      },
    ] as const;
  }, [entitiesData, serviceName]);

  const allEdges: Edge[] = useMemo((): Edge[] => {
    if (!serviceName || !entityData?.relations) {
      return [];
    }

    const directEdges: Edge[] = Object.entries(entityData.relations).flatMap(
      ([relationType, fromIdentifier]) => {
        if (Array.isArray(fromIdentifier)) {
          return fromIdentifier.map((from) => ({
            id: `${entityData.identifier}-${from}-${relationType}`,
            source: entityData.identifier,
            target: from,
            data: {
              label: relationType,
            },
          }));
        }
        if (!fromIdentifier) {
          return [];
        }

        return {
          id: `${entityData.identifier}-${fromIdentifier}-${relationType}`,
          source: entityData.identifier,
          target: fromIdentifier,
          data: {
            label: relationType,
          },
        };
      }
    );

    return [
      ...entitiesData.flatMap((entity) =>
        Object.entries(entity.relations ?? {}).flatMap(
          ([relationType, fromIdentifier]) => {
            if (Array.isArray(fromIdentifier)) {
              return fromIdentifier.map((from) => ({
                id: `${entity.identifier}-${from}-${relationType}`,
                source: entity.identifier,
                target: from,
                data: {
                  label: relationType,
                },
              })) as Edge[];
            }
            if (!fromIdentifier) {
              return [];
            }
            return {
              id: `${entity.identifier}-${fromIdentifier}-${relationType}`,
              source: entity.identifier,
              target: fromIdentifier,
              data: {
                label: relationType,
              },
            };
          }
        )
      ),
      ...directEdges,
    ];
  }, [entitiesData, serviceName, entityData]);

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
      {!isLoading && !error && (
        <ReactFlowProvider>
          <div style={{ height: 500 }}>
            <GraphView nodes={nodes} edges={allEdges} />
          </div>
        </ReactFlowProvider>
      )}
    </InfoCard>
  );
}

export default PortDependencyCard;
