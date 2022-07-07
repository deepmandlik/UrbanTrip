import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import { Box, Typography, IconButton } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { pink } from "@mui/material/colors";
import { MarkerObj } from "@interfaces/marker";

export default function Markers({ marker }: { marker: MarkerObj[] }) {
  const [popData, setPopData] = useState<MarkerObj | undefined>();
  const [showPopup, togglePopup] = useState<boolean>(false);

  return (
    <>
      {marker.map((data, index) => {
        return (
          <Marker
            key={index}
            latitude={data.latitude}
            longitude={data.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <IconButton
              onMouseEnter={(e) => {
                e.preventDefault();
                setPopData(data);
                togglePopup(true);
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                togglePopup(false);
              }}
            >
              <RoomIcon sx={{ color: pink[500], fontSize: "35px" }}></RoomIcon>
            </IconButton>
          </Marker>
        );
      })}
      {showPopup && (
        <Popup
          latitude={popData?.latitude as number}
          longitude={popData?.longitude as number}
          closeButton={false}
          anchor="bottom-right"
        >
          <Box
            style={{ width: "200px", padding: "7px" }}
          >
            <Typography sx={{ color: "#000" }}>
              {popData?.place_name}
            </Typography>
            <Typography sx={{ color: "#0007" }}>
              This place is {popData?.category} {popData?.address}
            </Typography>
          </Box>
        </Popup>
      )}
    </>
  );
}
