import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

export function ListLoadingSkeleton() {
  return (
    <Box p={2} sx={{ width: '100%' }}>
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
      <Skeleton variant="text" height={50} />
    </Box>
  );
}
