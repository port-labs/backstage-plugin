import { Content } from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import { ApiHooks } from '@port-labs/backstage-plugin-framework';
import React from 'react';
import {
  ChallengesBreakdown,
  ChallengesDetails,
  ResponsesOverTime,
  SurveyStats,
  TopChallenge,
} from '../components/charts';

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

  console.log(parsedResults);

  if (error) {
    return <div>Error loading survey results: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
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
