import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { RegisterBodyType } from "./models";
import { RegisterUser } from "./api";
import { useEffect, useState } from "react";

const RegisterScreen = () => {
  const RegisterSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string(),
  });

  type RegisterForm = z.infer<typeof RegisterSchema>;

  const { register, handleSubmit } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  });

  const RegisterMutation = useMutation({
    mutationFn: (body: RegisterBodyType) => {
      return RegisterUser(body.username, body.email, body.password);
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (RegisterMutation.isSuccess) {
      navigate("/login");
    }
  }, [RegisterMutation.isSuccess]);

  const onSubmit = (data: RegisterForm) => {
    console.log(data);
    RegisterMutation.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="main">
      <Card sx={{ width: "400px" }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex-col-8">
            <TextField
              id="filled-basic"
              label="username"
              variant="filled"
              {...register("username")}
            />
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
            <Button
              disabled={RegisterMutation.isPending}
              variant="contained"
              type="submit"
            >
              {RegisterMutation.isPending && (
                <CircularProgress size="15px" sx={{ marginRight: "4px" }} />
              )}
              Register
            </Button>
            <Link to="/login">Signin?</Link>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={RegisterMutation.isError}
        autoHideDuration={6000}
        message={RegisterMutation.error?.message}
      />
    </div>
  );
};

export default RegisterScreen;
