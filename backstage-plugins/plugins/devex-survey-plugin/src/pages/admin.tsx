import { Content } from '@backstage/core-components';
import {
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { ApiHooks } from '@port-labs/backstage-plugin-framework';
import React from 'react';
import {
  ChallengesBreakdown,
  ChallengesDetails,
  ResponsesOverTime,
  SurveyStats,
  TopChallenge,
} from '../components/charts';

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    maxWidth: 800,
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  message: {
    padding: theme.spacing(3),
  },
  progress: {
    marginTop: theme.spacing(2),
  },
}));

export type SurveyResult = {
  primary_blocker: string;
  work_planning_challenges: string;
  development_process_challenges: string;
  shipping_features_challenges: string;
  managing_production_challenges: string;
  feedback: string;
  email: string;
  last_updated: Date;
};

export const AdminPage = () => {
  const classes = useStyles();
  const {
    data: surveyResults,
    loading,
    error,
  } = ApiHooks.useSearchQuery({
    combinator: 'and',
    rules: [
      {
        property: '$blueprint',
        operator: '=',
        value: 'survey_results',
      },
    ],
  });

  const parsedResults: SurveyResult[] = (surveyResults ?? []).map(item => ({
    primary_blocker: (item.properties.blocking_your_flow ?? '') as string,
    work_planning_challenges: (item.properties.work_planning_challenges ??
      '') as string,
    development_process_challenges: (item.properties
      .development_process_challenges ?? '') as string,
    shipping_features_challenges: (item.properties
      .shipping_features_challenges ?? '') as string,
    managing_production_challenges: (item.properties
      .managing_production_challenges ?? '') as string,
    feedback: (item.properties.other_feedback ?? '') as string,
    email: (item.properties.email ?? '') as string,
    last_updated: new Date(item.updatedAt),
  }));

  if (error) {
    return (
      <Content>
        <Paper className={classes.loadingContainer}>
          <Typography variant="h4" color="error" className={classes.message}>
            Error Loading Survey Results
          </Typography>
          <Typography variant="body1" className={classes.message}>
            {error.message}
          </Typography>
        </Paper>
      </Content>
    );
  }

  if (loading) {
    return (
      <Content>
        <Paper className={classes.loadingContainer}>
          <Typography variant="body1" className={classes.message}>
            Loading survey results...
          </Typography>
          <LinearProgress className={classes.progress} />
        </Paper>
      </Content>
    );
  }

  return (
    <Content>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TopChallenge results={parsedResults} />
        </Grid>
        <Grid item xs={12}>
          <SurveyStats results={parsedResults} />
        </Grid>
        <Grid item md={6} xs={12}>
          <ResponsesOverTime results={parsedResults} />
        </Grid>
        <Grid item md={6} xs={12}>
          <ChallengesBreakdown results={parsedResults} />
        </Grid>
        <Grid item xs={12}>
          <ChallengesDetails results={parsedResults} />
        </Grid>
      </Grid>
    </Content>
  );
};
