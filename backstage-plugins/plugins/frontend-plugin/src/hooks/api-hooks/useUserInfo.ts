import { useApi } from '@backstage/core-plugin-api';
import { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import { PortAPI, portApiRef } from '../../api';
import { UsePortResult } from './types';

export function useUserInfo(): UsePortResult<PortAPI['getUserInfo']> {
  const portApi = useApi(portApiRef);

  const [state, getUserInfo] = useAsyncFn(async () => {
    return portApi.getUserInfo();
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  return {
    execute: getUserInfo,
    data: state.value,
    error: state.error,
    loading: state.loading,
  };
}

export default useUserInfo;
