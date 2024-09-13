import React, { useMemo } from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';
import useSearchQuery from '../../hooks/useSearchQuery/useSearchQuery.esm.js';
import { EntitiesTable } from '../EntitiesTable/EntitiesTable.esm.js';

const EntityTabPortContent = (props) => {
  const { entity } = useEntity();
  const { searchQuery } = useMemo(() => ({
    searchQuery: entity.metadata.annotations?.[props.annotation] ?? ""
  }), [entity.metadata.annotations, props.annotation]);
  const { data, isLoading } = useSearchQuery(searchQuery);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Related Entities"), /* @__PURE__ */ React.createElement(EntitiesTable, { entities: data ?? [], isLoading }));
};

export { EntityTabPortContent };
//# sourceMappingURL=EntityTabPortContent.esm.js.map
