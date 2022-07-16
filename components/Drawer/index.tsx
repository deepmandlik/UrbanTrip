import React, { useState } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Header from "@components/Header";
import ItemList from "@components/List";
import { getFetchData } from "@pages/api";

const drawerBleeding = 56;

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  map: any;
  getDirection: (item: any) => () => void;
  window?: () => Window;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default function Drawer(props: Props) {
  const { open, setOpen, window, map, getDirection } = props;
  const [itemData, setItemData] = useState<any>(null);

  const toggleDrawer = (type: string) => async () => {
    setOpen(true);
    setItemData(null);
    const bounds = map.getBounds();
    const response = await getFetchData(type, bounds?._sw, bounds?._ne);
    setItemData(response.filter((item: any) => item?.ad_position == undefined));
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(75% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />
      <Header toggleDrawer={toggleDrawer} />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            {itemData?.length ?? 0} results
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          {itemData ? (
            <ItemList key={itemData[0].latitude} itemData={itemData} getDirection={getDirection} />
          ) : (
            <Skeleton variant="rectangular" height="100%" />
          )}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
