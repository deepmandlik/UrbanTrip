import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactMapGL, {
  Marker,
  Source,
  Layer,
  MapRef,
  NavigationControl,
  GeolocateControl,
} from "react-map-gl";
import { MAPBOX_API_KEY, MAPBOX_STYLE_URL } from "@constants/apikey";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from "react-map-gl-geocoder";

const navControlStyle = {
  right: 20,
  bottom: 20,
};

const geolocateControlStyle = {
  right: 20,
  bottom: 115,
};

const mapSize = {
  width: "100vw",
  height: "100vh",
};

export default function UrbanMap() {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    latitude: 23.816189853778024,
    longitude: 86.4408162166436,
    zoom: 15,
    width: "100vw",
    height: "100vh",
  });

  const handleViewportChange = useCallback((newViewport) => {
    setViewport({ ...newViewport, ...mapSize });
  }, []);

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 2000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  return (
    <div>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_API_KEY}
        mapStyle={MAPBOX_STYLE_URL}
        attributionControl={false}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_API_KEY}
          zoom={12}
          clearAndBlurOnEsc={true}
          position="top-left"
        />
        <NavigationControl style={navControlStyle} />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true, timeout: 1000 }}
          trackUserLocation={true}
          showUserHeading={true}
        />
      </ReactMapGL>
    </div>
  );
}
