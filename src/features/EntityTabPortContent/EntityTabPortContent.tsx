import React from "react";
import { PortEntity } from "../../api/search";
import { EntitiesTable } from "../EntitiesTable/EntitiesTable";

export const EntityTabPortContent = ({
  blueprint,
  entities,
  isLoading,
}: {
  blueprint: string;
  entities: PortEntity[];
  isLoading: boolean;
}) => {
  return (
    <EntitiesTable
      entities={entities}
      isLoading={isLoading}
      title={`${blueprint.charAt(0).toUpperCase()}${blueprint.slice(1)}s`}
    />
  );
};
