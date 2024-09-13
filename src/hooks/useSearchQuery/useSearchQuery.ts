/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from 'react';
import search, { PortEntity } from '../../api/search';
import { useApi, configApiRef } from '@backstage/core-plugin-api';

const tryJsonParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

function useSearchQuery(searchQueryStr: string) {
  const [data, setData] = useState<PortEntity[]>([]);
  const [error, setError] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);
  const config = useApi(configApiRef);
  const backendUrl = useMemo(() => config.getString('backend.baseUrl'), []);

  const searchQuery = tryJsonParse(searchQueryStr);

  useEffect(() => {
    setIsLoading(true);

    search(backendUrl, searchQuery)
      .then(entities => {
        setData(entities);
        setError(null);
      })
      .catch(() => {
        setError('Failed fetching files');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQueryStr]);

  if (!searchQuery) {
    return { data: [], error: null, isLoading: false };
  }

  return { data, error, isLoading };
}

export default useSearchQuery;
