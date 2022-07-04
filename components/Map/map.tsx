import React, { useState, useRef } from "react";
import Map, { Marker, Source, Layer, MapRef } from "react-map-gl";
import { MAPBOX_API_KEY, MAPBOX_STYLE_URL } from "@constants/apikey";

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

export default function UrbanMap() {
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState<Viewport>({
    latitude: 23.816189853778024,
    longitude: 86.4408162166436,
    zoom: 10,
  });

  return (
    <div>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100vh" }}
        mapboxAccessToken={MAPBOX_API_KEY}
        mapStyle={MAPBOX_STYLE_URL}
        attributionControl={false}
      />
    </div>
  );
}
