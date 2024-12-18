import { useApi } from '@backstage/core-plugin-api';
import { useCallback } from 'react';
import { PortAPI, portApiRef } from '../../api';

export function useBlueprint(): PortAPI['createBlueprint'] {
  const portApi = useApi(portApiRef);

  const createBlueprint = useCallback(async (blueprint: string) => {
    return await portApi.createBlueprint(blueprint);
  }, []);

  return createBlueprint;
}
