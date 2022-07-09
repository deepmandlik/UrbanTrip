import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";
import { IconButton } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import { pink } from "@mui/material/colors";
import { MarkerObj } from "@interfaces/marker";
import PopupCard from "@components/Popup";

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
                setTimeout(() => {
                  togglePopup(false);
                }, 2000);
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
          <PopupCard
            title={popData?.place_name as string}
            info={`This place is ${popData?.category} ${popData?.address}`}
          />
        </Popup>
      )}
    </>
  );
}
