import React, { useMemo } from 'react';
import { Table } from '@backstage/core-components';

const EntitiesTable = (props) => {
  const columns = useMemo(() => {
    const getUniqueFieldsByProperties = (entities) => {
      const uniqueFields2 = /* @__PURE__ */ new Set();
      uniqueFields2.add("title");
      uniqueFields2.add("identifier");
      entities.forEach((entity) => {
        Object.keys(entity.properties).forEach((key) => {
          uniqueFields2.add(`properties.${key}`);
        });
        Object.keys(entity.relations).forEach((key) => {
          uniqueFields2.add(`relations.${key}`);
        });
      });
      return Array.from(uniqueFields2);
    };
    const uniqueFields = getUniqueFieldsByProperties(props.entities);
    return uniqueFields.map((field) => ({
      title: field,
      field
    }));
  }, [props.entities.length]);
  return /* @__PURE__ */ React.createElement(Table, { columns, isLoading: props.isLoading, data: props.entities });
};

export { EntitiesTable };
//# sourceMappingURL=EntitiesTable.esm.js.map
