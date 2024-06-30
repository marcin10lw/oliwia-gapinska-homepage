'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const useQueryParams = (query: string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const queryValue = params.get(query);

  const onQueryChange = (
    value: string | number | null,
    strategy: 'push' | 'replace' = 'push',
    keysToRemove?: string[],
  ) => {
    if (!!keysToRemove) {
      keysToRemove.forEach((key) => {
        params.delete(key);
      });
    }

    if (!!value) {
      params.set(query, String(value));
    } else {
      params.delete(query);
    }

    router[strategy](`${pathname}?${params.toString()}`);
  };

  return { queryValue, onQueryChange };
};
