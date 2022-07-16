import * as React from "react";
import Image from "next/image";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Typography from "@mui/material/Typography";
import AssistantDirectionRoundedIcon from "@mui/icons-material/AssistantDirectionRounded";

export default function ItemList({
  itemData,
  getDirection,
}: {
  itemData: any;
  getDirection: (item : any) => () => void;
}) {
  const screen1 = useMediaQuery("(min-width:900px)");
  const screen2 = useMediaQuery("(min-width:500px)");
  return (
    <ImageList
      cols={screen1 ? 4 : !screen2 ? 1 : 2}
      sx={{ width: "100%", overflow: "visible" }}
    >
      {itemData.map((item: any) => (
        <ImageListItem key={item?.listing_key}>
          <Image
            src={
              item?.photo?.images?.large?.url ??
              "https://maps.gstatic.com/tactile/reveal/no_street_view_2x_080615.png"
            }
            width={250}
            height={220}
            alt={item?.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item?.name}
            subtitle={
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                {!item?.is_closed ? (
                  <Typography color="#4CAF50">Open </Typography>
                ) : (
                  <Typography color="#F44336">Closed </Typography>
                )}
                <Typography> · {item?.rating ?? 0}</Typography>
                <Rating
                  value={Number(item?.rating ?? 0)}
                  precision={0.1}
                  readOnly
                  size="small"
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.55, color: "#FFF" }}
                      fontSize="inherit"
                    />
                  }
                />
                <Typography>{`(${item?.num_reviews ?? 0})`}</Typography>
              </Box>
            }
            actionIcon={
              <IconButton sx={{ color: "rgba(255, 255, 255, 0.74)" }} onClick={getDirection(item)}>
                <AssistantDirectionRoundedIcon style={{ fontSize: 30 }} />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
