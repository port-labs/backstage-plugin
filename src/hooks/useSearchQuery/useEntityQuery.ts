/* eslint-disable react-hooks/exhaustive-deps */
import { configApiRef, useApi } from "@backstage/core-plugin-api";
import { useEffect, useMemo, useState } from "react";
import getEntity from "../../api/entity";
import { PortEntity } from "../../api/types";

function useEntityQuery(entityId: string, blueprintId: string) {
  const [data, setData] = useState<PortEntity | null>();
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const config = useApi(configApiRef);
  const backendUrl = useMemo(() => config.getString("backend.baseUrl"), []);

  useEffect(() => {
    setIsLoading(true);

    getEntity(backendUrl, entityId, blueprintId)
      .then((entity) => {
        setData(entity);
        setError(null);
      })
      .catch(() => {
        setError("Failed fetching related entities");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [entityId, blueprintId]);

  if (!entityId || !blueprintId) {
    return { data: [], error: null, isLoading: false };
  }

  return { data, error, isLoading };
}

export default useEntityQuery;
