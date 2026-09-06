import { useState, type FormEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useParams } from "react-router";
import { usePublicBlocks, usePublicPage } from "../../features/public/publicQueries";
import { useBlocks, useCreateBlock } from "../../features/blocks/blocksQueries";
import LinkCard from "../../features/blocks/LinkCard";
import EditBlockDialog from "../../features/blocks/EditBlockDialog";
import { useAuth } from "../../context/authContext";
import { dotGridSx } from "../../theme/texture";
import type { Block } from "../../models/block";

const gridSx = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 2,
};

const PublicPageScreen = () => {
  const { slug } = useParams();
  const { isLoggedIn } = useAuth();
  const { data: page, isLoading: pageLoading, isError } = usePublicPage(slug);

  const canEdit = Boolean(isLoggedIn && page?.collaboration === "edit");

  // Anonymous / view-only visitors read through the public, unauthenticated endpoint.
  const publicBlocksQuery = usePublicBlocks(canEdit ? undefined : slug);
  // A logged-in collaborator on an edit-enabled page uses the same authenticated
  // hooks as the private editor — the backend now permits any logged-in user on a
  // public+edit page, not just the owner.
  const authedBlocksQuery = useBlocks(canEdit ? page?.id : undefined);

  const blocks = canEdit ? authedBlocksQuery.data : publicBlocksQuery.data;
  const blocksLoading = canEdit
    ? authedBlocksQuery.isLoading
    : publicBlocksQuery.isLoading;

  const createBlock = useCreateBlock(page?.id ?? "");
  const [url, setUrl] = useState("");
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);

  const handleAddLink = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = url.trim();

    if (!trimmed) {
      return;
    }

    createBlock.mutate(trimmed, { onSuccess: () => setUrl("") });
  };

  if (pageLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (isError || !page) {
    return (
      <Box sx={{ maxWidth: 480, mx: "auto", px: 4, py: 10, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          This page isn't available
        </Typography>
        <Typography color="text.secondary">
          The link may have been unpublished, or it never existed.
        </Typography>
      </Box>
    );
  }

  const hasContent = (blocks && blocks.length > 0) || createBlock.isPending;

  return (
    <Box sx={(theme) => ({ minHeight: "100dvh", ...dotGridSx(theme) })}>
      <Box sx={{ maxWidth: 960, mx: "auto", px: 4, py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {page.title || "Untitled"}
        </Typography>

        {canEdit && (
          <Box
            component="form"
            onSubmit={handleAddLink}
            sx={{ display: "flex", gap: 1, mt: 4, mb: 4 }}
          >
            <TextField
              placeholder="Paste a link to save it…"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              fullWidth
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!url.trim() || createBlock.isPending}
              startIcon={
                createBlock.isPending ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <AddLinkIcon />
                )
              }
              sx={{ flexShrink: 0 }}
            >
              Save
            </Button>
          </Box>
        )}

        <Box sx={{ mt: canEdit ? 0 : 4 }}>
          {blocksLoading ? (
            <Box sx={gridSx}>
              {[1, 2, 3].map((key) => (
                <Skeleton key={key} variant="rounded" height={180} />
              ))}
            </Box>
          ) : hasContent ? (
            <Box sx={gridSx}>
              {createBlock.isPending && <Skeleton variant="rounded" height={180} />}
              {blocks?.map((block) => (
                <LinkCard
                  key={block.id}
                  block={block}
                  pageId={page.id}
                  onEdit={setEditingBlock}
                  readOnly={!canEdit}
                />
              ))}
            </Box>
          ) : (
            <Stack sx={{ alignItems: "center", mt: 6 }}>
              <Typography color="text.secondary">No links here yet.</Typography>
            </Stack>
          )}
        </Box>

        {canEdit && (
          <EditBlockDialog
            block={editingBlock}
            pageId={page.id}
            onClose={() => setEditingBlock(null)}
          />
        )}
      </Box>
    </Box>
  );
};

export default PublicPageScreen;
