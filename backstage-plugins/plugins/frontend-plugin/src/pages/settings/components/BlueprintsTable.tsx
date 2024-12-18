import { alertApiRef, useApi } from '@backstage/core-plugin-api';
import { Box, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { ApiHooks } from '../../..';
import { TextModal } from './TextModal';

export function BlueprintsTable() {
  const { data, loading, error } = ApiHooks.useBlueprintsList();
  const createBlueprint = ApiHooks.useBlueprint();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const alertApi = useApi(alertApiRef);

  const handleAddBlueprint = async (blueprintJson: string) => {
    try {
      await createBlueprint(blueprintJson);
      alertApi.post({
        message: 'Blueprint created successfully!',
        severity: 'success',
      });
    } catch (err) {
      alertApi.post({
        message: 'Failed to create blueprint',
        severity: 'error',
      });
    } finally {
      setIsModalOpen(false);
    }
  };

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
    <Box>
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
      <Box p={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add blueprint
        </Button>
      </Box>

      <TextModal
        open={isModalOpen}
        title="Add New Blueprint"
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddBlueprint}
      />
    </Box>
  );
}
