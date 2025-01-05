import { InfoCard } from '@backstage/core-components';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { SurveyResult } from '../../pages/admin';

type Props = {
  results: SurveyResult[];
};

export const SurveyStats = ({ results }: Props) => {
  const totalResponses = results.length;
  const lastResponseDate = results.length
    ? new Date(
        Math.max(...results.map(r => new Date(r.last_updated).getTime())),
      )
    : null;

  return (
    <InfoCard title="Survey Statistics">
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Typography variant="h4">{totalResponses}</Typography>
          <Typography variant="subtitle1">Total Respondents</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h4">
            {lastResponseDate?.toLocaleDateString()}{' '}
            {lastResponseDate?.toLocaleTimeString()}
          </Typography>
          <Typography variant="subtitle1">Last Response</Typography>
        </Grid>
      </Grid>
    </InfoCard>
  );
};
