import { InfoCard } from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import React from 'react';
import MyOpenTasks from './MyOpenTasks';
import OpenPRs from './OpenPRs';
import PRsWaiting from './PRsWaiting';
import RecentCompletedTasks from './RecentCompletedTasks';

function Cards() {
  return (
    <Grid container spacing={3} direction="row">
      <Grid item xs={6}>
        <InfoCard noPadding title="My Open PRs">
          <OpenPRs />
        </InfoCard>
      </Grid>
      <Grid item xs={6}>
        <InfoCard noPadding title="PRs waiting for me to review">
          <PRsWaiting />
        </InfoCard>
      </Grid>
      <Grid item xs={6}>
        <InfoCard noPadding title="My open tasks">
          <MyOpenTasks />
        </InfoCard>
      </Grid>
      <Grid item xs={6}>
        <InfoCard noPadding title="Recent completed tasks">
          <RecentCompletedTasks />
        </InfoCard>
      </Grid>
    </Grid>
  );
}

export default Cards;
