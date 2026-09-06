import { loginUser } from "../../constants/apis";
import { httpClient } from "../../lib/httpClient";

export const LoginUser = (email: string, password: string) => {
  return httpClient.post(loginUser, { email, password });
};
