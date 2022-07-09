import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactMapGL, { NavigationControl, GeolocateControl } from "react-map-gl";
import { MAPBOX_API_KEY, MAPBOX_STYLE_URL } from "@constants/apikey";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from "react-map-gl-geocoder";
import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding";
import Markers from "@components/Marker";

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
  const map = mapRef.current?.getMap();
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
          setMarker((arr) => [
            ...arr,
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
      <ReactMapGL
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_API_KEY}
        mapStyle={MAPBOX_STYLE_URL}
        attributionControl={false}
        onClick={getCoordinates}
        ref={mapRef}
        {...viewport}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_API_KEY}
          clearAndBlurOnEsc={true}
          position="top-left"
          zoom={10}
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
    </div>
  );
}
