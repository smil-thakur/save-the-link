import { useState, type KeyboardEvent, type MouseEvent } from "react";
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { useNavigate, useParams } from "react-router";
import type { PageTreeNode } from "./buildPageTree";
import { useCreatePage, useDeletePage, useUpdatePage } from "./pagesQueries";
import ConfirmDialog from "../../components/ConfirmDialog";

interface PageTreeItemProps {
  node: PageTreeNode;
  depth: number;
}

const PageTreeItem = ({ node, depth }: PageTreeItemProps) => {
  const navigate = useNavigate();
  const { pageId } = useParams();
  const [expanded, setExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(node.title);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const createPage = useCreatePage();
  const updatePage = useUpdatePage();
  const deletePage = useDeletePage();

  const hasChildren = node.children.length > 0;
  const isActive = pageId === node.id;

  const commitRename = () => {
    const title = draftTitle.trim();
    setIsEditing(false);

    if (title && title !== node.title) {
      updatePage.mutate({ id: node.id, updates: { title } });
    } else {
      setDraftTitle(node.title);
    }
  };

  const handleAddSubpage = async (event: MouseEvent) => {
    event.stopPropagation();
    setExpanded(true);
    const created = await createPage.mutateAsync({
      title: "Untitled",
      parentPageId: node.id,
    });
    navigate(`/pages/${created.id}`);
  };

  const confirmDelete = () => {
    setConfirmOpen(false);
    deletePage.mutate(node.id);

    if (isActive) {
      navigate("/home");
    }
  };

  return (
    <>
      <ListItemButton
        data-page-id={node.id}
        selected={isActive}
        onClick={() => navigate(`/pages/${node.id}`)}
        sx={{
          pl: 1.5 + depth * 2,
          py: 0.5,
          borderRadius: 1,
        }}
      >
        <IconButton
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            setExpanded((prev) => !prev);
          }}
          sx={{ visibility: hasChildren ? "visible" : "hidden", mr: 0.25 }}
        >
          {expanded ? (
            <ExpandMoreIcon fontSize="small" />
          ) : (
            <ChevronRightIcon fontSize="small" />
          )}
        </IconButton>

        <Box sx={{ width: 20, textAlign: "center", mr: 0.75, flexShrink: 0 }}>
          {node.icon ?? <ArticleOutlinedIcon fontSize="small" />}
        </Box>

        {isEditing ? (
          <TextField
            autoFocus
            variant="standard"
            size="small"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            onBlur={commitRename}
            onKeyDown={(event: KeyboardEvent) => {
              if (event.key === "Enter") commitRename();
              if (event.key === "Escape") {
                setDraftTitle(node.title);
                setIsEditing(false);
              }
            }}
            onClick={(event) => event.stopPropagation()}
            sx={{ flex: 1 }}
          />
        ) : (
          <Typography
            variant="body2"
            noWrap
            sx={{
              flex: 1,
              color: node.title ? "text.primary" : "text.secondary",
            }}
          >
            {node.title || "Untitled"}
          </Typography>
        )}

        <Box sx={{ display: "flex", flexShrink: 0 }}>
          <IconButton
            size="small"
            onClick={handleAddSubpage}
            aria-label="Add subpage"
          >
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              setMenuAnchor(event.currentTarget);
            }}
            aria-label="Page options"
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Box>
      </ListItemButton>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        disableRestoreFocus
      >
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            setIsEditing(true);
          }}
        >
          Rename
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchor(null);
            setConfirmOpen(true);
          }}
          sx={{ color: "error.main" }}
        >
          Delete
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete page?"
        description={`"${node.title || "Untitled"}" and all of its subpages will be deleted.`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      {hasChildren && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {node.children.map((child) => (
              <PageTreeItem key={child.id} node={child} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default PageTreeItem;
