import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendHttpRequest = useCallback(
    async (url: string, method: string = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const abortCtrl = new AbortController();
      activeHttpRequests.current.push(abortCtrl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: abortCtrl.signal,
        });
        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== abortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => {
        abortCtrl.abort();
      });
    };
  }, []);

  return { isLoading, error, sendHttpRequest, clearError };
};
