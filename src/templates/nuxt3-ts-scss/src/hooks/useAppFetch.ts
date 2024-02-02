import { useFetch, useRuntimeConfig } from 'nuxt/app';

export const useAppFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();

  const options = {
    ...opts,
    headers: {
      ...opts?.headers,
    },
  };

  return useFetch(request, {
    baseURL: config.public.apiBaseUrl as string,
    ...options,
  });
};
