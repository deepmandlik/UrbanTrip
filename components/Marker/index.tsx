import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import { IconButton } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { MarkerObj } from "@interfaces/marker";
import PopupCard from "@components/Popup";

export default function Markers({
  marker,
  color,
}: {
  marker: MarkerObj;
  color: string;
}) {
  const [popData, setPopData] = useState<MarkerObj | undefined>();
  const [showPopup, togglePopup] = useState<boolean>(false);

  return (
    <>
      <Marker
        latitude={marker?.latitude}
        longitude={marker?.longitude}
        offsetLeft={-20}
        offsetTop={-35}
      >
        <IconButton
          onMouseEnter={(e) => {
            e.preventDefault();
            setPopData(marker);
            togglePopup(true);
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            setTimeout(() => {
              togglePopup(false);
            }, 3000);
          }}
        >
          <RoomIcon sx={{ color: color, fontSize: "35px" }}></RoomIcon>
        </IconButton>
      </Marker>
      {showPopup && (
        <Popup
          latitude={popData?.latitude as number}
          longitude={popData?.longitude as number}
          closeButton={false}
          anchor="bottom-right"
        >
          <PopupCard
            title={popData?.place_name as string}
            photo={popData?.photo as string}
            info={`This place is ${popData?.category} ${popData?.address}`}
          />
        </Popup>
      )}
    </>
  );
}
