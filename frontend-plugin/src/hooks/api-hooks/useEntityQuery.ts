/* eslint-disable react-hooks/exhaustive-deps */
import { useApi } from "@backstage/core-plugin-api";
import { useEffect } from "react";
import useAsyncFn from "react-use/esm/useAsyncFn";
import { PortAPI, portApiRef } from "../../api";
import { UsePortResult } from "./types";

function useEntityQuery(
  entityId: string | undefined,
  blueprintId: string
): UsePortResult<PortAPI["getEntity"]> {
  const portApi = useApi(portApiRef);

  const [state, queryEntity] = useAsyncFn(
    async (entityId: string, blueprintId: string) => {
      return portApi.getEntity(entityId, blueprintId);
    }
  );

  useEffect(() => {
    if (!entityId || !blueprintId) {
      return;
    }

    queryEntity(entityId, blueprintId);
  }, [entityId, blueprintId]);

  return {
    execute: queryEntity,
    data: state.value,
    error: state.error,
    loading: state.loading,
  };
}

export default useEntityQuery;
