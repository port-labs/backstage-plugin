import { useApi } from "@backstage/core-plugin-api";
import { useAsyncFn } from "react-use";
import { PortAPI, portApiRef } from "../../api";
import { UsePortResult } from "./types";

export function useActionRun(): UsePortResult<PortAPI["executeAction"]> {
  const portApi = useApi(portApiRef);

  const [state, executeAction] = useAsyncFn(
    async (
      actionId: string,
      serviceName: string,
      formData: Record<string, string>
    ) => {
      return portApi.executeAction(actionId, serviceName, formData);
    },
    [portApi]
  );

  return {
    execute: executeAction,
    data: state.value,
    error: state.error,
    loading: state.loading,
  };
}
