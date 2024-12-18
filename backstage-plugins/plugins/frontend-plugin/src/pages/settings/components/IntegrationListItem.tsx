import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import {
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TimerIcon from '@material-ui/icons/Timer';
import WarningIcon from '@material-ui/icons/Warning';
import React, { useState } from 'react';
import yaml from 'yaml';
import { portApiRef } from '../../../api';
import { Integration } from '../../../api/types';
import { TextModal } from './TextModal';

const resyncStatusIcons = {
  completed: <CheckCircleIcon />,
  failed: <WarningIcon />,
  running: <TimerIcon />,
} as const;

type IntegrationListItemProps = {
  integration: Integration;
};

export function IntegrationListItem({ integration }: IntegrationListItemProps) {
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false);
  const portApi = useApi(portApiRef);
  const alertApi = useApi(alertApiRef);

  const handleOpenMappingModal = () => {
    setIsMappingModalOpen(true);
  };

  const handleCloseMappingModal = () => {
    setIsMappingModalOpen(false);
  };

  return (
    <>
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
                onClick={handleOpenMappingModal}
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
      <TextModal
        open={isMappingModalOpen}
        onClose={handleCloseMappingModal}
        title={`Mapping Configuration - ${integration.installationAppType}`}
        defaultValue={yaml.stringify(integration.config)}
        onSave={async (text: string) => {
          await portApi
            .updateIntegration(integration.installationId, text)
            .then(() => {
              alertApi.post({
                message: 'Integration updated successfully!',
                severity: 'success',
              });
            })
            .catch(e => {
              alertApi.post({
                message: `Failed to update integration ${integration.installationId}: ${e.message}`,
                severity: 'error',
              });
            })
            .finally(() => {
              handleCloseMappingModal();
            });
        }}
      />
    </>
  );
}
