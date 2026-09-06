import { useState, type KeyboardEvent } from "react";
import {
  Box,
  CircularProgress,
  Dialog,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router";
import { useSearch } from "./searchQueries";
import type { Page } from "../../models/page";
import type { Block } from "../../models/block";

interface GlobalSearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const GlobalSearchDialog = ({ open, onClose }: GlobalSearchDialogProps) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data, isFetching } = useSearch(query);

  const goToPage = (page: Page) => {
    navigate(`/pages/${page.id}`);
    onClose();
    setQuery("");
  };

  const goToBlock = (block: Block) => {
    navigate(`/pages/${block.pageId}`);
    onClose();
    setQuery("");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "Enter") {
      return;
    }

    const firstPage = data?.pages[0];
    const firstBlock = data?.blocks[0];

    if (firstPage) {
      goToPage(firstPage);
    } else if (firstBlock) {
      goToBlock(firstBlock);
    }
  };

  const hasQuery = query.trim().length > 0;
  const hasResults = (data?.pages.length ?? 0) > 0 || (data?.blocks.length ?? 0) > 0;

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setQuery("");
      }}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: { verticalAlign: "top" } } }}
    >
      <Box sx={{ p: 2 }}>
        <TextField
          autoFocus
          fullWidth
          placeholder="Search pages and links…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </Box>

      <Box sx={{ maxHeight: 420, overflowY: "auto", px: 1, pb: 1 }}>
        {!hasQuery ? (
          <Typography color="text.secondary" sx={{ px: 2, py: 3 }}>
            Start typing to search your pages and saved links.
          </Typography>
        ) : isFetching ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress size={20} />
          </Box>
        ) : !hasResults ? (
          <Typography color="text.secondary" sx={{ px: 2, py: 3 }}>
            No results for "{query}".
          </Typography>
        ) : (
          <>
            {data && data.pages.length > 0 && (
              <List
                dense
                subheader={
                  <Typography variant="caption" color="text.secondary" sx={{ px: 2 }}>
                    Pages
                  </Typography>
                }
              >
                {data.pages.map((result) => (
                  <ListItemButton key={result.id} onClick={() => goToPage(result)}>
                    <DescriptionOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
                    <ListItemText primary={result.title || "Untitled"} />
                  </ListItemButton>
                ))}
              </List>
            )}

            {data && data.blocks.length > 0 && (
              <List
                dense
                subheader={
                  <Typography variant="caption" color="text.secondary" sx={{ px: 2 }}>
                    Links
                  </Typography>
                }
              >
                {data.blocks.map((result) => (
                  <ListItemButton key={result.id} onClick={() => goToBlock(result)}>
                    <LinkIcon fontSize="small" sx={{ mr: 1.5 }} />
                    <ListItemText
                      primary={result.title}
                      secondary={result.url}
                      slotProps={{ secondary: { noWrap: true } }}
                    />
                  </ListItemButton>
                ))}
              </List>
            )}
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default GlobalSearchDialog;
