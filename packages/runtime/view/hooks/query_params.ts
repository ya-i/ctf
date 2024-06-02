import type { ParsedUrlQuery } from 'querystring';

import { useEffect, useState } from 'react';

export function useQueryParams() {
  const [queryParams, setQueryParams] = useState<ParsedUrlQuery>({});

  useEffect(() => {
    function handlePopState() {
      const searchParams = new URLSearchParams(location.search).entries();
      setQueryParams(Object.fromEntries(searchParams));
    }

    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return queryParams;
}
