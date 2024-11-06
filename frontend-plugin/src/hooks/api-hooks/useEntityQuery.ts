/* eslint-disable react-hooks/exhaustive-deps */
import { configApiRef, fetchApiRef, useApi } from "@backstage/core-plugin-api";
import { useEffect, useMemo, useState } from "react";
import getEntity from "../../api/entity";
import { PortEntity } from "../../api/types";

function useEntityQuery(entityId: string | undefined, blueprintId: string) {
  const [data, setData] = useState<PortEntity | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const config = useApi(configApiRef);
  const fetchApi = useApi(fetchApiRef);
  const backendUrl = useMemo(() => config.getString("backend.baseUrl"), []);

  useEffect(() => {
    setIsLoading(true);

    if (!entityId || !blueprintId) {
      return;
    }

    getEntity(backendUrl, entityId, blueprintId, fetchApi.fetch)
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

  return { data, error, isLoading };
}

export default useEntityQuery;
