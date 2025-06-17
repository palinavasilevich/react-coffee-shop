import { useEffect, useState } from "react";

function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [fetchFn]);

  return { isFetching, fetchedData, error, setFetchedData };
}

export default useFetch;
