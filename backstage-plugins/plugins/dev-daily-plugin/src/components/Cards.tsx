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
  name: string;
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
  status: 'Done' | 'In Progress' | 'To Do';
};

function Cards({ email, name }: CardsProps) {
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
        value: 'dev-daily-pull-request',
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
        value: 'dev-daily-task',
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
    .map(
      item =>
        ({
          title: item.title ?? '',
          link: item.properties.link ?? '',
          assignee: item.properties.assignee ?? '',
          status: item.properties.status ?? '',
        } as Task),
    )
    .filter(task => task.assignee === email);

  console.log(parsedTasks);
  const myOpenPRs = parsedPRs.filter(
    pr => pr.creator === email || pr.creator === name,
  );
  const myPRsWaiting = parsedPRs.filter(
    pr => pr.assignees.includes(email) || pr.assignees.includes(name),
  );
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
