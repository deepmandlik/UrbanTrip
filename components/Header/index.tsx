import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { makeStyles } from "@config/makeStyles";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AttractionsIcon from "@mui/icons-material/Attractions";
import HeaderButton from "@components/Header/HeaderButton";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    width: "400px",
    position: "absolute",
    top: 10,
    left: 320,
    zIndex: 6,
    [theme.breakpoints.down("md")]: {
      top: 70,
      left: 0.1,
      width: "100%",
      zIndex: 1,
    },
  },
}));

export default function Header({
  toggleDrawer,
}: {
  toggleDrawer: (type: string) => () => void;
}) {
  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <HeaderButton
        name="hotels"
        icon={<HotelIcon />}
        toggleDrawer={toggleDrawer}
      />
      <HeaderButton
        name="restaurants"
        icon={<RestaurantIcon />}
        toggleDrawer={toggleDrawer}
      />
      <HeaderButton
        name="attractions"
        icon={<AttractionsIcon />}
        toggleDrawer={toggleDrawer}
      />
    </Box>
  );
}
