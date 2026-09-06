import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, TextField } from "@mui/material";
import { Link } from "react-router";
import { LoginUser } from "./api";
import type { LoginBodyType, LoginResponseType } from "./model";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "../../context/authContext";

const LoginScreen = () => {
  const RegisterSchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  type LoginForm = z.infer<typeof RegisterSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(RegisterSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (body: LoginBodyType) => {
      return LoginUser(body.email, body.password);
    },
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    loginMutation.mutate({ email: data.email, password: data.password });
  };

  const { login } = useAuth();

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const resp = loginMutation.data.data as LoginResponseType;
      login({ username: resp.username, email: resp.email });
    }
  }, [loginMutation.isSuccess]);

  return (
    <div className="main">
      <Card sx={{ width: "400px" }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex-col-8">
            <TextField
              id="filled-basic"
              label="email"
              variant="filled"
              {...register("email")}
            />
            <TextField
              id="filled-basic"
              type="password"
              label="password"
              variant="filled"
              {...register("password")}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
            <Link to="/register">Signup?</Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;
