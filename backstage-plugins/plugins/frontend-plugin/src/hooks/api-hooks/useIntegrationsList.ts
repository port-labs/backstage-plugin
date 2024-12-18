import { useApi } from '@backstage/core-plugin-api';
import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { PortAPI, portApiRef } from '../../api';
import { UsePortResult } from './types';

export function useIntegrationsList(): UsePortResult<
  PortAPI['getIntegrations']
> {
  const portApi = useApi(portApiRef);

  const [state, getIntegrations] = useAsyncFn(async () => {
    return await portApi.getIntegrations();
  }, []);

  useEffect(() => {
    getIntegrations();
  }, []);

  return {
    execute: getIntegrations,
    data: state.value,
    error: state.error,
    loading: state.loading,
  };
}
