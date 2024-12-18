import { useApi } from '@backstage/core-plugin-api';
import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { PortAPI, portApiRef } from '../../api';
import { UsePortResult } from './types';

export function useBlueprintsList(): UsePortResult<PortAPI['getBlueprints']> {
  const portApi = useApi(portApiRef);

  const [state, getBlueprints] = useAsyncFn(async () => {
    return await portApi.getBlueprints();
  }, []);

  useEffect(() => {
    getBlueprints();
  }, []);

  return {
    execute: getBlueprints,
    data: state.value,
    error: state.error,
    loading: state.loading,
  };
}
