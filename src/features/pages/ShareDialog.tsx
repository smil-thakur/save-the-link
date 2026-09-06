import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import type { Page, PageCollaboration } from "../../models/page";
import { usePublishPage, useUnpublishPage } from "./pagesQueries";
import { useToast } from "../../context/toastContext";

interface ShareDialogProps {
  page: Page;
  open: boolean;
  onClose: () => void;
}

const ShareDialog = ({ page, open, onClose }: ShareDialogProps) => {
  const publishPage = usePublishPage();
  const unpublishPage = useUnpublishPage();
  const { showToast } = useToast();
  const [collaboration, setCollaboration] = useState<Exclude<PageCollaboration, "none">>(
    page.collaboration === "edit" ? "edit" : "view",
  );

  const isPublic = page.visibility === "public";
  const shareUrl = page.slug ? `${window.location.origin}/p/${page.slug}` : "";

  const handleToggle = (checked: boolean) => {
    if (checked) {
      publishPage.mutate({ id: page.id, collaboration });
    } else {
      unpublishPage.mutate(page.id);
    }
  };

  const handleCollaborationChange = (value: Exclude<PageCollaboration, "none">) => {
    setCollaboration(value);
    publishPage.mutate({ id: page.id, collaboration: value });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Link copied");
    } catch {
      showToast("Couldn't copy the link", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Share "{page.title || "Untitled"}"</DialogTitle>
      <DialogContent>
        <Stack sx={{ gap: 2.5, mt: 1 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isPublic}
                onChange={(event) => handleToggle(event.target.checked)}
              />
            }
            label={isPublic ? "Anyone with the link can view" : "Private"}
          />

          {isPublic && (
            <>
              <TextField
                label="Share link"
                value={shareUrl}
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleCopy}
                          aria-label="Copy link"
                          size="small"
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Stack sx={{ gap: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Permission
                </Typography>
                <RadioGroup
                  value={collaboration}
                  onChange={(event) =>
                    handleCollaborationChange(
                      event.target.value as Exclude<PageCollaboration, "none">,
                    )
                  }
                >
                  <FormControlLabel value="view" control={<Radio />} label="View only" />
                  <FormControlLabel
                    value="edit"
                    control={<Radio />}
                    label="Anyone with the link can edit"
                  />
                </RadioGroup>
              </Stack>

              <Alert severity="info" variant="outlined">
                Turning this back to private will invalidate the link above.
              </Alert>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareDialog;
