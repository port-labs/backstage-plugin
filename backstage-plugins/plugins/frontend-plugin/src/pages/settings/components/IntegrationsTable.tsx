import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TimerIcon from '@material-ui/icons/Timer';
import WarningIcon from '@material-ui/icons/Warning';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { ApiHooks } from '../../..';

const resyncStatusIcons = {
  completed: <CheckCircleIcon />,
  failed: <WarningIcon />,
  running: <TimerIcon />,
} as const;

export function IntegrationsTable() {
  const { data, loading, error } = ApiHooks.useIntegrationsList();

  if (loading) {
    return (
      <Box p={2} sx={{ width: '100%' }}>
        <Skeleton variant="text" height={50} />
        <Skeleton variant="text" height={50} />
        <Skeleton variant="text" height={50} />
      </Box>
    );
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <List style={{ maxHeight: 300, overflow: 'auto' }}>
      {data.map(integration => (
        <ListItem key={integration.installationId} dense>
          <ListItemIcon>
            {resyncStatusIcons?.[integration.resyncState?.status ?? 'failed']}
          </ListItemIcon>
          <ListItemText
            primary={integration.installationAppType}
            secondary={`${integration.installationAppType} - ${integration.installationId}`}
          />
          <ListItemSecondaryAction>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert('TODO')}
                >
                  Mapping
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert('TODO')}
                >
                  Resync
                </Button>
              </Grid>
            </Grid>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
