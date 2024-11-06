/* eslint-disable react-hooks/exhaustive-deps */
import { configApiRef, fetchApiRef, useApi } from "@backstage/core-plugin-api";
import { useEffect, useMemo, useState } from "react";
import getActions from "../../api/action";
import { Action, GlobalAction } from "../../api/types";

function useActionsQuery(blueprintId: string) {
  const [data, setData] = useState<(GlobalAction | Action)[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const config = useApi(configApiRef);
  const fetchApi = useApi(fetchApiRef);
  const backendUrl = useMemo(() => config.getString("backend.baseUrl"), []);

  useEffect(() => {
    setIsLoading(true);

    if (!blueprintId) {
      return;
    }

    getActions(backendUrl, blueprintId, fetchApi.fetch)
      .then((actions) => {
        setData(actions);
        setError(null);
      })
      .catch(() => {
        setError("Failed fetching related entities");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [blueprintId]);

  return { data, error, isLoading };
}

export default useActionsQuery;
