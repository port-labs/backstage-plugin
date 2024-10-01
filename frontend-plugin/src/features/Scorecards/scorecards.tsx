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

const getLevelEmoji = (level: "Bronze" | "Silver" | "Gold" | "Basic") => {
  switch (level) {
    case "Bronze":
      return "🥉";
    case "Silver":
      return "🥈";
    case "Gold":
      return "🥇";
    case "Basic":
    default:
      return "🚫";
  }
};

const getLevelColor = (level: "Bronze" | "Silver" | "Gold" | "Basic") => {
  switch (level) {
    case "Bronze":
      return "#eba763";
    case "Silver":
      return "#C0C0C0";
    case "Gold":
      return "#FFA500";
    default:
      return "#FFFFFF";
  }
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
      render: (rowData: any) => {
        return (
          <Chip
            label={`${getLevelEmoji(rowData.level)} ${rowData.level}`}
            style={{
              backgroundColor: getLevelColor(rowData.level),
            }}
          />
        );
      },
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
                color: rule.status === "SUCCESS" ? "#046B15" : "#6F2518",
                backgroundColor:
                  rule.status === "SUCCESS"
                    ? "rgba(79, 205, 68, 0.3)"
                    : "rgba(255, 111, 85, 0.3)",
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
