import { useState, type KeyboardEvent } from "react";
import { Box, Chip, TextField } from "@mui/material";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  label?: string;
}

const TagInput = ({ tags, onChange, label = "Tags" }: TagInputProps) => {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const value = draft.trim();

    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
    }

    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    } else if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <Box>
      <TextField
        label={label}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder="Add a tag and press Enter"
        fullWidth
      />
      {tags.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              onDelete={() => onChange(tags.filter((t) => t !== tag))}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TagInput;
