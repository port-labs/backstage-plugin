/* eslint-disable react-hooks/exhaustive-deps */
import { useApi } from "@backstage/core-plugin-api";
import { useEffect } from "react";
import { useAsyncFn } from "react-use";
import { PortAPI, portApiRef } from "../../api";
import { UsePortResult } from "./types";

export function useActionsQuery(
  blueprintId: string
): UsePortResult<PortAPI["getActions"]> {
  const portApi = useApi(portApiRef);

  const [state, queryActions] = useAsyncFn(
    async (blueprintId: string) => {
      if (!blueprintId) {
        throw new Error("Blueprint ID is required");
      }

      return portApi.getActions(blueprintId);
    },
    [blueprintId]
  );

  useEffect(() => {
    queryActions(blueprintId);
  }, [queryActions, blueprintId]);

  return {
    execute: queryActions,
    data: state.value,
    error: state.error,
    loading: state.loading,
  };
}
