import { Content, Progress } from "@backstage/core-components";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Cancel from "@material-ui/icons/Cancel";
import CheckCircle from "@material-ui/icons/CheckCircle";
import { Alert } from "@material-ui/lab";
import React, { useMemo } from "react";
import { getLevelEmoji } from "../../features/Scorecards/scorecards";
import useSearchQuery from "../../hooks/api-hooks/useSearchQuery";

const SERVICE_BLUEPRINT_ID = "service";
export type ScorecardRow = {
  type: "scorecard";
  scorecard: string;
  level: string;
};
export type RuleRow = {
  type: "rule";
  rule: string;
  status: "SUCCESS" | "FAILURE";
  scorecard: string;
  level: string;
};
export type OverviewRow = ScorecardRow | RuleRow;

const useStyles = makeStyles({
  scorecardRow: {
    backgroundColor: "#F0F0F0",
    fontWeight: "bold",
    fontSize: "1.1em",
    color: "#333333",
    padding: "12px 8px",
    borderBottom: "2px solid #1976d2",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  scorecardRowMedal: {
    backgroundColor: "#F0F0F0",
    fontSize: "1.5em",
  },
  nameRow: {
    backgroundColor: "transparent",
  },
  nameCell: {
    backgroundColor: "transparent",
    fontStyle: "italic",
    whiteSpace: "nowrap",
    maxWidth: "50px",
  },
});

export const ScorecardsSummaryPage = () => {
  const { data, isLoading, error } = useSearchQuery({
    combinator: "and",
    rules: [
      {
        property: "$blueprint",
        operator: "=",
        value: SERVICE_BLUEPRINT_ID,
      },
    ],
  });

  const classes = useStyles();

  const transposedData: OverviewRow[] = useMemo(() => {
    if (!data) {
      return [];
    }
    return Object.entries(data[0]?.scorecards ?? {})
      .map(([scorecardName, scorecard]) => {
        return [
          {
            type: "scorecard",
            scorecard: scorecardName,
            level: scorecard.level,
          },
          ...scorecard.rules.map((rule) => ({
            type: "rule",
            scorecard: scorecardName,
            rule: rule.identifier,
            status: rule.status,
            level: rule.level,
          })),
        ] as OverviewRow[];
      })
      ?.flat();
  }, [data]);

  return (
    <Content noPadding>
      {isLoading && <Progress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!isLoading && !error && data && (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.nameRow}>Services</TableCell>
                {data.map((entity) => {
                  return (
                    <TableCell className={classes.nameCell}>
                      {entity.title}
                    </TableCell>
                  );
                })}
              </TableRow>

              {transposedData.map((row) => {
                if (row.type === "scorecard") {
                  return (
                    <TableRow
                      key={`scorecard-${row.scorecard}`}
                      className={classes.scorecardRow}
                    >
                      <TableCell className={classes.scorecardRow}>
                        {row.scorecard}
                      </TableCell>
                      {data.map((entity) => {
                        const entityLevel =
                          entity.scorecards?.[row.scorecard]?.level;
                        return (
                          <TableCell className={classes.scorecardRowMedal}>
                            {getLevelEmoji(entityLevel as any)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }

                return (
                  <TableRow key={`rule-${row.rule}`}>
                    <TableCell>
                      <div>{row.rule}</div>
                    </TableCell>
                    {data.map((entity) => {
                      const entityStatus = entity.scorecards?.[
                        row.scorecard
                      ]?.rules?.find(
                        (rule) => rule.identifier === row.rule
                      )?.status;

                      return (
                        <TableCell>
                          {entityStatus === "SUCCESS" ? (
                            <CheckCircle color="primary" />
                          ) : (
                            <Cancel color="secondary" />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Content>
  );
};
