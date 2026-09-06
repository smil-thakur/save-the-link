import { useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import { server_host } from "../constants/apis";
import { dotGridSx } from "../theme/texture";

type Status = "checking" | "waking" | "ready";

const PING_TIMEOUT_MS = 5000;
const RETRY_DELAY_MS = 3000;
const SLOW_NOTE_THRESHOLD_S = 60;

/**
 * Gates the app behind a successful /ping. The backend runs on a free Render
 * instance that sleeps after 15 minutes idle and takes up to ~a minute to wake
 * back up — without this, the first request after a sleep would just hang or
 * silently fail (and could even flash the user to the login screen) with no
 * explanation. Most loads hit an already-warm server, so the very first ping
 * fails silently into a plain spinner before showing the "waking up" copy.
 */
const ColdStartGate = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<Status>("checking");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (status === "ready") {
      return;
    }

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout>;
    const startedAt = Date.now();

    const tickTimer = setInterval(() => {
      if (!cancelled) {
        setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000));
      }
    }, 1000);

    const poll = async () => {
      try {
        await axios.get(`${server_host}/ping`, { timeout: PING_TIMEOUT_MS });
        if (!cancelled) {
          setStatus("ready");
        }
      } catch {
        if (cancelled) {
          return;
        }
        setStatus((prev) => (prev === "checking" ? "waking" : prev));
        retryTimer = setTimeout(poll, RETRY_DELAY_MS);
      }
    };

    poll();

    return () => {
      cancelled = true;
      clearTimeout(retryTimer);
      clearInterval(tickTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "ready") {
    return <>{children}</>;
  }

  return (
    <Box
      sx={(theme) => ({
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        textAlign: "center",
        px: 3,
        ...dotGridSx(theme),
      })}
    >
      <Box component="img" src="/favicon.svg" alt="" sx={{ width: 40, height: 40 }} />
      <CircularProgress size={28} />

      {status === "waking" && (
        <>
          <Typography variant="h6" sx={{ fontWeight: 700, maxWidth: 420, mt: 1 }}>
            Waking up the server
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 380 }}>
            This app runs on a free server that goes to sleep when nobody's
            using it. It's booting back up — this can take up to a minute.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {elapsedSeconds}s elapsed
          </Typography>
          {elapsedSeconds > SLOW_NOTE_THRESHOLD_S && (
            <Typography variant="caption" color="text.secondary">
              Still working on it — you can keep waiting, or refresh the page.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ColdStartGate;
