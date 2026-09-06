import { logoutUser, meUser } from "../constants/apis";
import { httpClient } from "../lib/httpClient";
import type { User } from "../models/user";

export const GetMe = () => {
  return httpClient.get<User>(meUser);
};

export const LogoutRequest = () => {
  return httpClient.post(logoutUser);
};

export const DeleteAccountRequest = () => {
  return httpClient.delete(meUser);
};
