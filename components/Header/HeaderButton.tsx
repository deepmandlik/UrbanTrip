import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HeaderButton({
  name,
  icon,
}: {
  name: string;
  icon: any;
}) {
  const matches = useMediaQuery("(min-width:360px)");
  return (
    <Button
      variant="contained"
      startIcon={matches ? icon : null}
      sx={{
        textTransform: "capitalize",
        borderRadius: "20px",
        background: "#FFF",
        color: "#000",
        "&:hover": {
          background: "#000",
          color: "#FFF",
        },
      }}
    >
      {name}
    </Button>
  );
}
