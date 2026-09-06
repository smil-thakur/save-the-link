import axios from "axios";
import { registerUser } from "../../constants/apis";
import { httpClient } from "../../lib/httpClient";
import type { RegisterErrorResponse } from "./models";

export const RegisterUser = (
  username: string,
  email: string,
  password: string,
) => {
  return httpClient
    .post(registerUser, { username, email, password })
    .catch((error: unknown) => {
      if (
        axios.isAxiosError<RegisterErrorResponse>(error) &&
        error.response?.data.message
      ) {
        throw new Error(error.response.data.message);
      }

      throw error;
    });
};
