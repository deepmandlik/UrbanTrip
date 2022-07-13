import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactMapGL, { NavigationControl, GeolocateControl } from "react-map-gl";
import { MAPBOX_API_KEY, MAPBOX_STYLE_URL } from "@constants/apikey";
import useMediaQuery from "@mui/material/useMediaQuery";
import Geocoder from "react-map-gl-geocoder";
import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding";
import Markers from "@components/Marker";
import Drawer from "@components/Drawer";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const navControlStyle = {
  right: 20,
  bottom: 20,
};

const geolocateControlStyle = {
  right: 20,
  bottom: 115,
};

const mapStyle = {
  width: "100vw",
  height: "100vh",
  transitionDuration: 1500,
};

export default function UrbanMap() {
  const mapRef = useRef();
  const map = mapRef.current?.getMap();
  const geocoderContainerRef = useRef();
  const screen = useMediaQuery("(min-width:750px)");
  const geocodingClient = mapboxSdk({ accessToken: MAPBOX_API_KEY });
  const [marker, setMarker] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 23.816189853778024,
    longitude: 86.4408162166436,
    zoom: 12,
    width: "100vw",
    height: "100vh",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setViewport({
        ...viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
    // eslint-disable-next-line
  }, []);

  const handleViewportChange = useCallback((newViewport) => {
    setViewport({ ...newViewport, ...mapStyle });
  }, []);

  const getCoordinates = (event) => {
    event.preventDefault();
    geocodingClient
      .reverseGeocode({
        query: [event.lngLat[0], event.lngLat[1]],
      })
      .send()
      .then((response) => {
        if (
          response &&
          response.body &&
          response.body.features &&
          response.body.features.length
        ) {
          const feature = response.body.features[0];
          setMarker([
            {
              latitude: event.lngLat[1],
              longitude: event.lngLat[0],
              place_name: feature.text,
              address: feature.place_name,
              category: feature.properties.category,
              bookmark: false,
            },
          ]);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div>
      <Drawer map={map}/>
      <ReactMapGL
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_API_KEY}
        mapStyle={MAPBOX_STYLE_URL}
        attributionControl={false}
        onDblClick={getCoordinates}
        ref={mapRef}
        {...viewport}
      >
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={MAPBOX_API_KEY}
          clearAndBlurOnEsc={true}
          clearOnBlur={true}
          position="top-left"
          zoom={10}
          style={{ width: 600 }}
        />
        <NavigationControl style={navControlStyle} />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true, timeout: 1000 }}
          style={geolocateControlStyle}
          trackUserLocation={true}
          showUserHeading={true}
        />
        <Markers marker={marker} />
      </ReactMapGL>
      <div
        ref={geocoderContainerRef}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 4,
          width: screen ? "65%" : "95%",
        }}
      />
    </div>
  );
}
