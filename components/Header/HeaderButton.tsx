import React from "react";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HeaderButton({
  name,
  icon,
  toggleDrawer,
}: {
  name: string;
  icon: any;
  toggleDrawer: (type: string) => () => void;
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
      onClick={toggleDrawer(name)}
    >
      {name}
    </Button>
  );
}
