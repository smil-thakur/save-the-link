import { useQuery } from "@tanstack/react-query";
import * as usersApi from "../../api/users";
import { useDebouncedValue } from "../../lib/useDebouncedValue";

export const useSearchUsers = (query: string) => {
  const debounced = useDebouncedValue(query.trim(), 250);

  return useQuery({
    queryKey: ["users-search", debounced],
    queryFn: () => usersApi.searchUsers(debounced).then((response) => response.data),
    enabled: debounced.length >= 2,
  });
};
