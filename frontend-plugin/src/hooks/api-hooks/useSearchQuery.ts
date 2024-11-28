/* eslint-disable react-hooks/exhaustive-deps */
import { useApi } from "@backstage/core-plugin-api";
import { useEffect } from "react";
import { useAsyncFn } from "react-use";
import { PortAPI, portApiRef } from "../../api";
import { UsePortResult } from "./types";

function useSearchQuery(
  searchQuery: any,
  include?: string[]
): UsePortResult<PortAPI["search"]> {
  const portApi = useApi(portApiRef);
  const [state, searchEntities] = useAsyncFn(
    async (searchQuery: any, include?: string[]) => {
      return portApi.search(searchQuery, include);
    }
  );

  useEffect(() => {
    if (searchQuery) {
      searchEntities(searchQuery, include);
    }
  }, [JSON.stringify(searchQuery)]);

  return {
    execute: searchEntities,
    data: state.value,
    error: state.error,
    loading: state.loading,
  };
}

export default useSearchQuery;
