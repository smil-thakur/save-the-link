import { useState, type SyntheticEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
import { useThemeMode } from "../../context/themeModeContext";
import { useToast } from "../../context/toastContext";
import { DeleteAccountRequest } from "../../context/api";
import { getErrorMessage } from "../../lib/getErrorMessage";
import ConfirmDialog from "../../components/ConfirmDialog";

const GeneralTab = () => {
  const { user, logout } = useAuth();
  const { mode, setMode } = useThemeMode();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteAccount = useMutation({
    mutationFn: () => DeleteAccountRequest(),
    onSuccess: () => {
      logout();
      navigate("/login");
    },
    onError: (error) =>
      showToast(getErrorMessage(error, "Couldn't delete your account."), "error"),
  });

  return (
    <>
      <Stack sx={{ gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Account
        </Typography>
        <Typography color="text.secondary">{user?.username}</Typography>
        <Typography color="text.secondary">{user?.email}</Typography>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Stack sx={{ gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Appearance
        </Typography>
        <RadioGroup
          row
          value={mode}
          onChange={(event) => setMode(event.target.value as "light" | "dark")}
          sx={{ mt: 1 }}
        >
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Stack sx={{ gap: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "error.main" }}>
          Danger zone
        </Typography>
        <Typography color="text.secondary">
          Deleting your account permanently removes every page and link you've saved.
          This can't be undone.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setConfirmOpen(true)}
          sx={{ alignSelf: "flex-start" }}
        >
          Delete account
        </Button>
      </Stack>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete your account?"
        description="This permanently deletes your account and everything you've saved. This can't be undone."
        confirmLabel="Delete account"
        onConfirm={() => {
          setConfirmOpen(false);
          deleteAccount.mutate();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

const AboutTab = () => {
  return (
    <Stack sx={{ gap: 4 }}>
      <Stack sx={{ gap: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          About this app
        </Typography>
        <Typography color="text.secondary">
          Save The Link is a home for the links you don't want to lose — the system
          design video, the recipe, the article someone sent you that's now buried in a
          chat. Organize them into pages, get an automatic preview for each link, tag and
          search across everything, and share a page as a read-only or collaborative
          link when it's worth handing to someone else.
        </Typography>
      </Stack>

      <Divider />

      <Stack sx={{ gap: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Creator
        </Typography>
        <Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 56, height: 56, fontWeight: 700 }}>ST</Avatar>
          <Stack sx={{ gap: 0.25 }}>
            <Typography sx={{ fontWeight: 600 }}>Smil Raj Thakur</Typography>
            <Typography variant="body2" color="text.secondary">
              Fullstack engineer — microfrontend architecture and AI-native products.
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap", mt: 1 }}>
          <Button
            component="a"
            href="https://github.com/smil-thakur"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<GitHubIcon fontSize="small" />}
          >
            GitHub
          </Button>
          <Button
            component="a"
            href="https://linkedin.com/in/smil-raj-thakur"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<LinkedInIcon fontSize="small" />}
          >
            LinkedIn
          </Button>
          <Button
            component="a"
            href="https://smil-thakur.github.io/Portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="small"
            startIcon={<LanguageIcon fontSize="small" />}
          >
            Portfolio
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

const SettingsScreen = () => {
  const [tab, setTab] = useState<"general" | "about">("general");

  const handleTabChange = (_event: SyntheticEvent, value: "general" | "about") => {
    setTab(value);
  };

  return (
    <Box sx={{ maxWidth: 560, mx: "auto", px: 4, py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Settings
      </Typography>

      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 4 }}>
        <Tab value="general" label="General" />
        <Tab value="about" label="About" />
      </Tabs>

      {tab === "general" ? <GeneralTab /> : <AboutTab />}
    </Box>
  );
};

export default SettingsScreen;
