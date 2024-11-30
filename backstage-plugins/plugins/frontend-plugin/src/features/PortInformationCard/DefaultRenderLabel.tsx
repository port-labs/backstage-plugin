import { DependencyGraphTypes } from "@backstage/core-components";
import makeStyles from "@material-ui/core/styles/makeStyles";
import classNames from "classnames";
import React from "react";
import { EntityEdgeData } from "./types";

export type CustomLabelClassKey = "text" | "secondary";

const useStyles = makeStyles(
  (theme) => ({
    text: {
      fill: theme.palette.textContrast,
    },
    secondary: {
      fill: theme.palette.textSubtle,
    },
  }),
  { name: "PortDependencyCardCustomLabel" }
);

export function DefaultRenderLabel({
  edge: { relations },
}: DependencyGraphTypes.RenderLabelProps<EntityEdgeData>) {
  const classes = useStyles();
  return (
    <text className={classes.text} textAnchor="middle">
      {relations.map((r, i) => (
        <tspan key={r} className={classNames(i % 2 !== 0 && classes.secondary)}>
          {i > 0 && <tspan> / </tspan>}
          {r}
        </tspan>
      ))}
    </text>
  );
}
