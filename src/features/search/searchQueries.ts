import { useQuery } from "@tanstack/react-query";
import * as searchApi from "../../api/search";
import { useDebouncedValue } from "../../lib/useDebouncedValue";

export const useSearch = (query: string) => {
  const debounced = useDebouncedValue(query.trim(), 250);

  return useQuery({
    queryKey: ["search", debounced],
    queryFn: () => searchApi.search(debounced).then((response) => response.data),
    enabled: debounced.length > 0,
  });
};
