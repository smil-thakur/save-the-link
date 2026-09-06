import { server_host } from "../constants/apis";
import { httpClient } from "../lib/httpClient";
import type { SearchResults } from "../models/search";

export const search = (query: string) =>
  httpClient.get<SearchResults>(`${server_host}/search`, { params: { q: query } });
