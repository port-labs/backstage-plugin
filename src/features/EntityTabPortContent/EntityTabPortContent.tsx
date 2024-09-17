import { useEntity } from "@backstage/plugin-catalog-react";
import React, { useMemo } from "react";
import useSearchQuery from "../../hooks/useSearchQuery/useSearchQuery";
import { EntitiesTable } from "../EntitiesTable/EntitiesTable";

export const EntityTabPortContent = (props: { annotation: string }) => {
  const { entity } = useEntity();
  const { searchQuery } = useMemo(
    () => ({
      searchQuery: entity.metadata.annotations?.[props.annotation] ?? "",
    }),
    [entity.metadata.annotations, props.annotation]
  );

  const { data, isLoading } = useSearchQuery(searchQuery);

  return (
    <div>
      <h2>Related Entities</h2>
      <EntitiesTable entities={data ?? []} isLoading={isLoading} />
    </div>
  );
};
