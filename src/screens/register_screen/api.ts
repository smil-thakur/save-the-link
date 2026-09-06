import { registerUser } from "../../constants/apis";
import { httpClient } from "../../lib/httpClient";

export const RegisterUser = (
  username: string,
  email: string,
  password: string,
) => {
  return httpClient.post(registerUser, { username, email, password });
};
