import { Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

export const LoadingSkeleton = () => {
  return (
    <Box p={2}>
      <Skeleton height={400} variant="rect" animation="wave" />
    </Box>
  );
};
