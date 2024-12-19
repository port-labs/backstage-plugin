import { InfoCard } from '@backstage/core-components';
import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import { Box, Button, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { ApiHooks } from '../../..';
import { ListLoadingSkeleton } from './ListLoadingSkeleton';
import { TextModal } from './TextModal';

export function BlueprintsTable() {
  const { data, loading, error } = ApiHooks.useBlueprintsList();

  if (loading) {
    return <ListLoadingSkeleton />;
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <List style={{ maxHeight: 300, overflow: 'auto' }}>
      {data.map(blueprint => (
        <ListItem key={blueprint.identifier} dense>
          <ListItemText
            primary={blueprint.title}
            secondary={blueprint.identifier}
          />
        </ListItem>
      ))}
    </List>
  );
}

export function BlueprintCard() {
  const createBlueprint = ApiHooks.useBlueprint();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const alertApi = useApi(alertApiRef);

  const handleAddBlueprint = async (blueprintJson: string) => {
    await createBlueprint(blueprintJson)
      .then(() => {
        alertApi.post({
          message: 'Blueprint created successfully!',
          severity: 'success',
        });
      })
      .catch(err => {
        alertApi.post({
          message: `Failed to create blueprint: ${err.message}`,
          severity: 'error',
        });
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  return (
    <InfoCard
      title="Data models - Blueprints"
      noPadding
      actions={[
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add blueprint
        </Button>,
      ]}
    >
      <Box>
        <BlueprintsTable />
        <TextModal
          open={isModalOpen}
          title="Add New Blueprint"
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddBlueprint}
        />
      </Box>
    </InfoCard>
  );
}
