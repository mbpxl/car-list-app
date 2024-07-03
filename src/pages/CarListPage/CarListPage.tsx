import { Box } from "@mui/material";
import { Cars } from "../../components/ui/Cars/Cars";
import React from "react";

export const CarListPage = React.memo(() => {
  return (
    <Box>
      <Cars />
    </Box>
  );
});
