import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loader: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
};
