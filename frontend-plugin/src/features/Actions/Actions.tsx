import { InfoCard, Table, TableColumn } from "@backstage/core-components";
import React from "react";
import useActionsQuery from "../../hooks/api-hooks/useActionsQuery";
import { ActionsModal } from "./ActionsModal";

const SERVICE_BLUEPRINT_ID = "service";

export function Actions() {
  const { data, isLoading, error } = useActionsQuery(SERVICE_BLUEPRINT_ID);

  const columns: TableColumn[] = [
    {
      title: "Title",
      field: "title",
    },
    {
      title: "Description",
      field: "description",
    },
    {
      title: "User Input",
      field: "user_input",
      hidden: true,
    },
    {
      title: "id",
      field: "id",
      hidden: true,
    },
    {
      title: "Execute",
      render: (rowData: any) => (
        <ActionsModal
          user_input={rowData.user_input}
          id={rowData.id}
          title={rowData.title}
          description={rowData.description}
        />
      ),
    },
  ];

  const tableData = data
    ?.filter((action) => action.trigger.operation === "DAY-2")
    ?.map((action) => ({
      title: action.title,
      description: action.description,
      id: action.identifier,
      user_input: action.trigger.userInputs,
    }));

  if (!isLoading && !error && tableData && tableData.length > 0) {
    return (
      <InfoCard title="Actions" noPadding>
        <Table
          title="Day-2 Actions"
          columns={columns}
          data={tableData}
          options={{
            search: false,
            paging: false,
            actionsColumnIndex: -1,
          }}
        />
      </InfoCard>
    );
  }
  return <div />;
}
