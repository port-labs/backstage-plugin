import { useState, useMemo, useEffect } from 'react';
import search from '../../api/search.esm.js';
import { useApi, configApiRef } from '@backstage/core-plugin-api';

const tryJsonParse = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};
function useSearchQuery(searchQueryStr) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const config = useApi(configApiRef);
  const backendUrl = useMemo(() => config.getString("backend.baseUrl"), []);
  const searchQuery = tryJsonParse(searchQueryStr);
  useEffect(() => {
    setIsLoading(true);
    search(backendUrl, searchQuery).then((entities) => {
      setData(entities);
      setError(null);
    }).catch(() => {
      setError("Failed fetching files");
    }).finally(() => {
      setIsLoading(false);
    });
  }, [searchQueryStr]);
  if (!searchQuery) {
    return { data: [], error: null, isLoading: false };
  }
  return { data, error, isLoading };
}

export { useSearchQuery as default };
//# sourceMappingURL=useSearchQuery.esm.js.map
