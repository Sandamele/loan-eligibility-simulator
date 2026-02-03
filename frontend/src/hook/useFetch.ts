import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useFetch = <T,>(path: string) => {
  const [results, setResults] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const controller = new AbortController();

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/${path}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Status: ${response.status}`);
        }

        const noContent = response.status === 204;
        const data = noContent ? null : ((await response.json()) as T);

        setResults((prev) => ({ ...prev, data }));
      } catch (error: unknown) {
        setResults((prev) => ({
          ...prev,
          error:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        }));
      } finally {
        setResults((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, [path]);

  return results;
};
