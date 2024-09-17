import { Link, Table, TableColumn } from "@backstage/core-components";
import get from "lodash/get";
import React, { useMemo } from "react";
import validator from "validator";
import { PortEntity } from "../../api/search";

export const EntitiesTable = (props: {
  entities: PortEntity[];
  isLoading: boolean;
  title: string;
}) => {
  const columns: TableColumn[] = useMemo(() => {
    const getUniqueFieldsByProperties = (entities: PortEntity[]) => {
      const uniqueFields = new Set<string>();
      uniqueFields.add("title");
      uniqueFields.add("identifier");

      entities.forEach((entity) => {
        Object.keys(entity.properties).forEach((key) => {
          uniqueFields.add(`properties.${key}`);
        });
        Object.keys(entity.relations).forEach((key) => {
          uniqueFields.add(`relations.${key}`);
        });
      });

      return Array.from(uniqueFields);
    };

    const uniqueFields = getUniqueFieldsByProperties(props.entities);

    return uniqueFields.map(
      (field): TableColumn => ({
        title: field.split(".").pop(),
        field,
        render: (data: any) => {
          const value = get(data, field);

          if (typeof value === "boolean")
            return <div>{value ? "True" : "False"}</div>;

          if (value === null || value === undefined || !value)
            return <div>-</div>;

          if (typeof value === "object")
            return <div>{JSON.stringify(value)}</div>;

          if (typeof value !== "string") return <div>{value}</div>;

          if (validator.isURL(value)) return <Link to={value}>{value}</Link>;

          if (validator.isEmail(value))
            return <Link to={`mailto:${value}`}>{value}</Link>;

          if (validator.isMobilePhone(value))
            return <Link to={`tel:${value}`}>{value}</Link>;

          if (validator.isISO8601(value))
            return <div>{new Date(value).toLocaleString()}</div>;

          return <div>{value}</div>;
        },
      })
    );
  }, [props.entities.length]);

  return (
    <div>
      <Table
        title={props.title}
        columns={columns}
        isLoading={props.isLoading}
        data={props.entities}
      />
    </div>
  );
};
