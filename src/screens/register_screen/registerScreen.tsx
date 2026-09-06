import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { RegisterUser } from "./api";
import { useEffect } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import PasswordField from "../../components/PasswordField";
import { getErrorMessage } from "../../lib/getErrorMessage";

const RegisterSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof RegisterSchema>;

const RegisterScreen = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterForm) =>
      RegisterUser(data.username, data.email, data.password),
  });

  useEffect(() => {
    if (registerMutation.isSuccess) {
      navigate("/login");
    }
  }, [registerMutation.isSuccess, navigate]);

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="One place for every link you don't want to lose."
      footer={
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "inherit", fontWeight: 600 }}>
            Sign in
          </Link>
        </Typography>
      }
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ gap: 2.5 }}
      >
        {registerMutation.isError && (
          <Alert severity="error">
            {getErrorMessage(
              registerMutation.error,
              "Something went wrong. Please try again.",
            )}
          </Alert>
        )}

        <TextField
          label="Username"
          autoComplete="username"
          autoFocus
          fullWidth
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username")}
        />

        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          fullWidth
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <PasswordField
          label="Password"
          autoComplete="new-password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />

        <PasswordField
          label="Confirm password"
          autoComplete="new-password"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={!isValid || registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Create account"
          )}
        </Button>
      </Stack>
    </AuthLayout>
  );
};

export default RegisterScreen;
