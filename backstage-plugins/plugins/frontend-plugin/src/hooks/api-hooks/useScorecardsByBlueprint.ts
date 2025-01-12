import { useApi } from '@backstage/core-plugin-api';
import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { PortAPI, portApiRef } from '../../api';
import { UsePortResult } from './types';

export function useScorecardsByBlueprint(
  blueprintId: string,
): UsePortResult<PortAPI['getScorecardsByBlueprint']> {
  const portApi = useApi(portApiRef);

  const [state, getScorecardsByBlueprint] = useAsyncFn(
    async (blueprintId: string) => {
      return await portApi.getScorecardsByBlueprint(blueprintId);
    },
    [],
  );

  useEffect(() => {
    getScorecardsByBlueprint(blueprintId);
  }, []);

  return {
    execute: getScorecardsByBlueprint,
    data: state.value,
    error: state.error,
    loading: state.loading,
  };
}
