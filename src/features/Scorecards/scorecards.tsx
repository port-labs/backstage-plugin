import { InfoCard, Table } from "@backstage/core-components";
import { Chip } from "@material-ui/core";

import React from "react";

export type ScorecardProps = {
  name: string;
  scorecards: {
    name: string;
    level: string;
    rules: {
      name: string;
      status: string;
    }[];
  }[];
};

export const Scorecards = ({ name, scorecards }: ScorecardProps) => {
  const data = scorecards.map((scorecard) => ({
    name: scorecard.name,
    level: scorecard.level,
    rules: scorecard.rules.map((rule) => ({
      name: rule.name,
      status: rule.status,
    })),
  }));

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Level",
      field: "level",
    },
    {
      title: "Rules",
      field: "rules",
      render: (rowData: any) => {
        return rowData.rules.map((rule: any) => (
          <p key={rule.name}>
            <Chip
              label={rule.name}
              style={{
                backgroundColor:
                  rule.status === "SUCCESS" ? "#73EC8B" : "#FF7373",
              }}
            />
          </p>
        ));
      },
    },
  ];

  return (
    <InfoCard title="Scorecards" noPadding>
      <Table
        title={name}
        columns={columns}
        data={data}
        options={{
          paging: false,
          search: false,
          sorting: false,
        }}
      />
    </InfoCard>
  );
};

export default Scorecards;
