/* eslint-disable react-hooks/exhaustive-deps */
import { configApiRef, useApi } from "@backstage/core-plugin-api";
import { useEffect, useMemo, useState } from "react";
import search from "../../api/search";
import { PortEntity } from "../../api/types";

function useSearchQuery(searchQuery: any) {
  const [data, setData] = useState<PortEntity[]>([]);
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const config = useApi(configApiRef);
  const backendUrl = useMemo(() => config.getString("backend.baseUrl"), []);

  useEffect(() => {
    setIsLoading(true);

    search(backendUrl, searchQuery)
      .then((entities) => {
        setData(entities);
        setError(null);
      })
      .catch(() => {
        setError("Failed fetching related entities");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [JSON.stringify(searchQuery)]);

  if (!searchQuery) {
    return { data: [], error: null, isLoading: false };
  }

  return { data, error, isLoading };
}

export default useSearchQuery;
