import { Entity } from "@backstage/catalog-model";
import { DependencyGraphTypes } from "@backstage/core-components";

export type EntityEdgeData = {
  /**
   * Up to two relations that are connecting an entity.
   */
  relations: string[];
  /**
   * Whether the entity is visible or not.
   */
  // Not used, but has to be non-empty to draw a label at all!
  label: "visible";
};

/**
 * Edge between two entities.
 *
 * @public
 */
export type EntityEdge = DependencyGraphTypes.DependencyEdge<EntityEdgeData>;

/**
 * Additional data for Entity Node
 *
 * @public
 */
export type EntityNodeData = {
  /**
   * The Entity
   */
  entity: Entity;
  /**
   * Whether the entity is focused, optional, defaults to false. Focused
   * entities are highlighted in the graph.
   */
  focused?: boolean;
  /**
   * Optional color of the entity, defaults to 'default'.
   */
  color?: "primary" | "secondary" | "default";
  /**
   * Optional click handler.
   */
  onClick?: React.MouseEventHandler<unknown>;
};

/**
 * Node representing an entity.
 *
 * @public
 */
export type EntityNode = DependencyGraphTypes.DependencyNode<EntityNodeData>;
