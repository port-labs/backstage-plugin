import { InfoCard } from '@backstage/core-components';
import { Grid, Typography } from '@material-ui/core';
import { ApiHooks } from '@port-labs/backstage-plugin-port-frontend';
import React from 'react';
import { LoadingSkeleton } from './LoadingSkeleton';
import MyOpenTasks from './MyOpenTasks';
import OpenPRs from './OpenPRs';
import PRsWaiting from './PRsWaiting';
import RecentCompletedTasks from './RecentCompletedTasks';

type CardsProps = {
  email: string;
};

export type PR = {
  title: string;
  link: string;
  assignees: string[];
  creator: string;
};

export type Task = {
  title: string;
  link: string;
  assignee: string;
  status: string;
};

function Cards({ email }: CardsProps) {
  const {
    data: prsRawData,
    loading: prsLoading,
    error: prsError,
  } = ApiHooks.useSearchQuery({
    combinator: 'and',
    rules: [
      {
        property: '$blueprint',
        operator: '=',
        value: 'githubPullRequest',
      },
    ],
  });

  const {
    data: tasksRawData,
    loading: tasksLoading,
    error: tasksError,
  } = ApiHooks.useSearchQuery({
    combinator: 'and',
    rules: [
      {
        property: '$blueprint',
        operator: '=',
        value: 'tasks',
      },
    ],
  });

  const parsedPRs: PR[] = (prsRawData ?? []).map(item => ({
    title: item.title ?? '',
    link: (item.properties.link ?? '') as string,
    assignees: (item.properties.assignees ?? []) as string[],
    creator: (item.properties.creator ?? '') as string,
  }));

  const parsedTasks: Task[] = (tasksRawData ?? [])
    .map(item => ({
      title: item.title ?? '',
      link: (item.properties.link ?? '') as string,
      assignee: (item.properties.assignee ?? '') as string,
      status: (item.properties.status ?? '') as string,
    }))
    .filter(task => task.assignee === email);

  const myOpenPRs = parsedPRs.filter(pr => pr.creator === email);
  const myPRsWaiting = parsedPRs.filter(pr => pr.assignees.includes(email));
  const myOpenTasks = parsedTasks.filter(task => task.status !== 'Done');
  const recentCompletedTasks = parsedTasks.filter(
    task => task.status === 'Done',
  );

  const error = prsError || tasksError;
  const loading = prsLoading || tasksLoading;

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error fetching: {prsError?.message}, {tasksError?.message}
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} direction="row">
      <Grid item md={6} xs={12}>
        <InfoCard noPadding title="My Open PRs">
          {loading ? <LoadingSkeleton /> : <OpenPRs prs={myOpenPRs} />}
        </InfoCard>
      </Grid>
      <Grid item md={6} xs={12}>
        <InfoCard noPadding title="PRs waiting for me to review">
          {loading ? <LoadingSkeleton /> : <PRsWaiting prs={myPRsWaiting} />}
        </InfoCard>
      </Grid>
      <Grid item md={6} xs={12}>
        <InfoCard noPadding title="My open tasks">
          {loading ? <LoadingSkeleton /> : <MyOpenTasks tasks={myOpenTasks} />}
        </InfoCard>
      </Grid>
      <Grid item md={6} xs={12}>
        <InfoCard noPadding title="Recent completed tasks">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <RecentCompletedTasks tasks={recentCompletedTasks} />
          )}
        </InfoCard>
      </Grid>
    </Grid>
  );
}

export default Cards;
