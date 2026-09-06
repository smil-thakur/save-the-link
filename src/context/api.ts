import { meUser } from "../constants/apis";
import { httpClient } from "../lib/httpClient";
import type { User } from "../models/user";

export const GetMe = () => {
  return httpClient.get<User>(meUser);
};
