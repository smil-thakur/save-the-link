import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import { Link } from "react-router";
import { usePublicPagesList } from "./publicQueries";

const ExplorePublicPages = () => {
  const { data: pages } = usePublicPagesList();

  if (!pages || pages.length === 0) {
    return null;
  }

  const rows = Array.from({ length: 3 }, (_, rowIndex) => ({
    pages: rowIndex % 2 === 0 ? pages : [...pages].reverse(),
    duration: `${30 + rowIndex * 7}s`,
    direction: rowIndex === 1 ? "reverse" : "normal",
  }));

  return (
    <Box
      component="section"
      aria-labelledby="explore-public-pages-heading"
      sx={{
        width: { xs: "calc(100vw - 32px)", sm: 520 },
        maxWidth: "100%",
        mt: 5,
        pb: 1.5,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: "0 8px 28px rgba(20, 22, 28, 0.06)",
        overflow: "hidden",
      }}
    >
      <Divider />
      <Stack
        direction="row"
        sx={{
          alignItems: "baseline",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          mb: 0.25,
        }}
      >
        <Typography
          id="explore-public-pages-heading"
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 600, letterSpacing: "0.04em" }}
        >
          Explore public pages
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Open a collection
        </Typography>
      </Stack>

      <Stack
        aria-label="Public page collections"
        sx={{
          gap: 1.25,
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          "@keyframes public-pages-marquee": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-50%)" },
          },
          "@media (prefers-reduced-motion: reduce)": {
            overflowX: "auto",
            maskImage: "none",
            "& .public-pages-track": {
              animation: "none",
            },
          },
        }}
      >
        {rows.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              overflow: "hidden",
              "&:hover .public-pages-track, &:focus-within .public-pages-track":
                {
                  animationPlayState: "paused",
                },
            }}
          >
            <Box
              className="public-pages-track"
              sx={{
                display: "flex",
                width: "max-content",
                animation: "public-pages-marquee linear infinite",
                animationDuration: row.duration,
                animationDirection: row.direction,
                willChange: "transform",
              }}
            >
              {[0, 1].map((copyIndex) => (
                <Stack
                  key={copyIndex}
                  direction="row"
                  aria-hidden={copyIndex === 1}
                  sx={{ gap: 1.25, pr: 1.25 }}
                >
                  {row.pages.map((page) => (
                    <Box
                      key={`${copyIndex}-${page.slug}`}
                      component={Link}
                      to={`/p/${page.slug}`}
                      sx={{
                        display: "flex",
                        width: { xs: 112, sm: 124 },
                        aspectRatio: "1 / 1",
                        flexShrink: 0,
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: 1,
                        p: 1.5,
                        borderRadius: 1.5,
                        textDecoration: "none",
                        color: "text.primary",
                        bgcolor: "background.paper",
                        border: 1,
                        borderColor: "divider",
                        boxShadow: "0 4px 16px rgba(20, 22, 28, 0.06)",
                        transition:
                          "border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease",
                        "&:hover": {
                          borderColor: "primary.main",
                          boxShadow: "0 8px 24px rgba(36, 82, 224, 0.16)",
                          transform: "translateY(-3px)",
                        },
                        "&:focus-visible": {
                          outline: "3px solid",
                          outlineColor: "primary.main",
                          outlineOffset: 2,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          width: 34,
                          height: 34,
                          placeItems: "center",
                          borderRadius: 1,
                          bgcolor: "action.hover",
                          color: "primary.main",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                        }}
                      >
                        {page.icon ?? <PublicIcon fontSize="small" />}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          display: "-webkit-box",
                          overflow: "hidden",
                          fontWeight: 600,
                          lineHeight: 1.25,
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                        }}
                      >
                        {page.title || "Untitled"}
                      </Typography>
                      <Chip
                        label={`${page.linkCount} link${page.linkCount === 1 ? "" : "s"}`}
                        size="small"
                        variant="outlined"
                        sx={{ alignSelf: "flex-start", maxWidth: "100%" }}
                      />
                    </Box>
                  ))}
                </Stack>
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ExplorePublicPages;
