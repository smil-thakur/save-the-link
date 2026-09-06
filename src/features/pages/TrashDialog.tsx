import { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTrash, useRestorePage, usePermanentlyDeletePage } from "./pagesQueries";
import ConfirmDialog from "../../components/ConfirmDialog";
import type { Page } from "../../models/page";

interface TrashDialogProps {
  open: boolean;
  onClose: () => void;
}

const TrashDialog = ({ open, onClose }: TrashDialogProps) => {
  const { data: pages, isLoading } = useTrash(open);
  const restorePage = useRestorePage();
  const permanentlyDeletePage = usePermanentlyDeletePage();
  const [confirmTarget, setConfirmTarget] = useState<Page | null>(null);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Trash</DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Typography color="text.secondary">Loading…</Typography>
          ) : !pages || pages.length === 0 ? (
            <Typography color="text.secondary">Trash is empty.</Typography>
          ) : (
            <List disablePadding>
              {pages.map((page) => (
                <ListItem
                  key={page.id}
                  disableGutters
                  secondaryAction={
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="small"
                        aria-label="Restore page"
                        onClick={() => restorePage.mutate(page.id)}
                      >
                        <RestartAltIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="Delete forever"
                        onClick={() => setConfirmTarget(page)}
                      >
                        <DeleteForeverIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText primary={page.title || "Untitled"} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmTarget !== null}
        title="Delete forever?"
        description={`"${confirmTarget?.title || "Untitled"}" and everything in it will be permanently deleted. This can't be undone.`}
        confirmLabel="Delete forever"
        onConfirm={() => {
          if (confirmTarget) {
            permanentlyDeletePage.mutate(confirmTarget.id);
          }
          setConfirmTarget(null);
        }}
        onCancel={() => setConfirmTarget(null)}
      />
    </>
  );
};

export default TrashDialog;
