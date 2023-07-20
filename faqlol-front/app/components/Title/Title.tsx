"use client";
import { Box, Typography, useTheme } from "@mui/material";

export default function Title() {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      mb={theme.spacing(5)}
    >
      <Typography variant="h2">Frequently Asked Questions</Typography>
    </Box>
  );
}
