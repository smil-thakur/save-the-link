import type { ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { dotGridSx } from "../theme/texture";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

const AuthLayout = ({ title, subtitle, children, footer }: AuthLayoutProps) => {
  return (
    <Box
      sx={(theme) => ({
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 6,
        ...dotGridSx(theme),
      })}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Stack sx={{ alignItems: "center", textAlign: "center", mb: 4, gap: 1.5 }}>
          <Box
            component="img"
            src="/favicon.svg"
            alt=""
            sx={{ width: 40, height: 40 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography color="text.secondary">{subtitle}</Typography>
        </Stack>

        {children}

        <Box sx={{ mt: 3, textAlign: "center" }}>{footer}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
