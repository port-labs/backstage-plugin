import { DEFAULT_NAMESPACE } from "@backstage/catalog-model";
import { DependencyGraphTypes } from "@backstage/core-components";
import { useEntityPresentation } from "@backstage/plugin-catalog-react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import React, { useLayoutEffect, useRef, useState } from "react";
import { EntityNodeData } from "./types";

export type CustomNodeClassKey = "node" | "text" | "clickable";

const useStyles = makeStyles(
  (theme) => ({
    node: {
      fill: theme.palette.grey[300],
      stroke: theme.palette.grey[300],

      "&.primary": {
        fill: theme.palette.primary.light,
        stroke: theme.palette.primary.light,
      },
      "&.secondary": {
        fill: theme.palette.secondary.light,
        stroke: theme.palette.secondary.light,
      },
    },
    text: {
      fill: theme.palette.getContrastText(theme.palette.grey[300]),

      "&.primary": {
        fill: theme.palette.primary.contrastText,
      },
      "&.secondary": {
        fill: theme.palette.secondary.contrastText,
      },
      "&.focused": {
        fontWeight: "bold",
      },
    },
    clickable: {
      cursor: "pointer",
    },
  }),
  { name: "PortDependencyCardCustomNode" }
);

export function DefaultRenderNode({
  node: { id, entity, color = "default", focused, onClick },
}: DependencyGraphTypes.RenderNodeProps<EntityNodeData>) {
  const classes = useStyles();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const idRef = useRef<SVGTextElement | null>(null);
  const entityRefPresentationSnapshot = useEntityPresentation(entity, {
    defaultNamespace: DEFAULT_NAMESPACE,
  });

  useLayoutEffect(() => {
    // set the width to the length of the ID
    if (idRef.current) {
      let { height: renderedHeight, width: renderedWidth } =
        idRef.current.getBBox();
      renderedHeight = Math.round(renderedHeight);
      renderedWidth = Math.round(renderedWidth);

      if (renderedHeight !== height || renderedWidth !== width) {
        setWidth(renderedWidth);
        setHeight(renderedHeight);
      }
    }
  }, [width, height]);

  const padding = 10;
  const paddedIconWidth = 0;
  const paddedWidth = paddedIconWidth + width + padding * 2;
  const paddedHeight = height + padding * 2;

  const displayTitle = entityRefPresentationSnapshot.primaryTitle ?? id;

  return (
    <g onClick={onClick} className={classNames(onClick && classes.clickable)}>
      <rect
        className={classNames(
          classes.node,
          color === "primary" && "primary",
          color === "secondary" && "secondary"
        )}
        width={paddedWidth}
        height={paddedHeight}
        rx={10}
      />
      <text
        ref={idRef}
        className={classNames(
          classes.text,
          focused && "focused",
          color === "primary" && "primary",
          color === "secondary" && "secondary"
        )}
        y={paddedHeight / 2}
        x={paddedIconWidth + (width + padding * 2) / 2}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {displayTitle}
      </text>
      <title>{entityRefPresentationSnapshot.entityRef}</title>
    </g>
  );
}
