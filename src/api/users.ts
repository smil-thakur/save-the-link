import { server_host } from "../constants/apis";
import { httpClient } from "../lib/httpClient";

export interface UserSummary {
  username: string;
  email: string;
}

export const searchUsers = (query: string) =>
  httpClient.get<UserSummary[]>(`${server_host}/users/search`, {
    params: { q: query },
  });
