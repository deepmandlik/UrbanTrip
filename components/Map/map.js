import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
  Marker,
  WebMercatorViewport,
} from "react-map-gl";
import { MAPBOX_API_KEY, MAPBOX_STYLE_URL } from "@constants/apikey";
import useMediaQuery from "@mui/material/useMediaQuery";
import Geocoder from "react-map-gl-geocoder";
import geocodingSdk from "@mapbox/mapbox-sdk/services/geocoding";
import directionsSdk from "@mapbox/mapbox-sdk/services/directions";
import Markers from "@components/Marker";
import Drawer from "@components/Drawer";
import TripOriginRoundedIcon from "@mui/icons-material/TripOriginRounded";
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
};

const applyToArray = (func, array) => func.apply(Math, array);

const getBoundsForPoints = (points) => {
  // Calculate corner values of bounds
  const pointsLong = points.map((point) => point[0]);
  const pointsLat = points.map((point) => point[1]);
  const cornersLongLat = [
    [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
    [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)],
  ];
  // Use WebMercatorViewport to get center longitude/latitude and zoom
  const viewport = new WebMercatorViewport({
    width: 600,
    height: 600,
  }).fitBounds(cornersLongLat, {
    padding: { top: 20, bottom: 20, left: 20, right: 20 },
  });
  const { longitude, latitude, zoom } = viewport;
  return { longitude, latitude, zoom };
};

export default function UrbanMap() {
  const mapRef = useRef();
  const map = mapRef.current?.getMap();
  const geocoderContainerRef = useRef();
  const screen = useMediaQuery("(min-width:750px)");
  const geocodingClient = geocodingSdk({ accessToken: MAPBOX_API_KEY });
  const directionsClient = directionsSdk({ accessToken: MAPBOX_API_KEY });
  const [marker, setMarker] = useState();
  const [place, setPlace] = useState();
  const [home, setHome] = useState(null);
  const [layerData, setLayerData] = useState(null);
  const [open, setOpen] = useState(false);
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
      setHome({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
    // eslint-disable-next-line
  }, []);

  const handleViewportChange = useCallback((newViewport) => {
    setViewport({ ...newViewport, ...mapStyle });
  }, []);

  const getDirection = (item) => () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      directionsClient
        .getDirections({
          profile: "walking",
          waypoints: [
            {
              coordinates: [pos.coords.longitude, pos.coords.latitude],
            },
            {
              coordinates: [Number(item?.longitude), Number(item?.latitude)],
            },
          ],
          geometries: "geojson",
        })
        .send()
        .then((response) => {
          const directions = response.body.routes[0].geometry.coordinates;
          const bounds = getBoundsForPoints(directions);
          const boundsTransition = { transitionDuration: 1300 };
          setViewport({ ...bounds, ...mapStyle, ...boundsTransition });
          setLayerData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: directions,
            },
          });
          setPlace({
            latitude: directions[directions.length - 1][1],
            longitude: directions[directions.length - 1][0],
            place_name: item?.name,
            photo: item?.photo?.images?.large?.url,
            address: item?.address ?? "",
            category: item?.ranking ?? "",
          });
        });
    });
    setOpen(false);
  };

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
          setMarker({
            latitude: event.lngLat[1],
            longitude: event.lngLat[0],
            place_name: feature.text,
            photo: null,
            address: feature.place_name,
            category: feature.properties.category ?? "",
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div>
      <Drawer
        map={map}
        getDirection={getDirection}
        open={open}
        setOpen={setOpen}
      />
      <ReactMapGL
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_API_KEY}
        mapStyle={MAPBOX_STYLE_URL}
        attributionControl={false}
        doubleClickZoom={false}
        onDblClick={getCoordinates}
        ref={mapRef}
        {...viewport}
      >
        {layerData && (
          <Source id="polylineLayer" type="geojson" data={layerData}>
            <Layer
              id="lineLayer"
              type="line"
              source="my-data"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "rgb(25, 118, 210)",
                "line-width": 5,
                "line-opacity": 0.85,
              }}
            />
          </Source>
        )}
        {place && <Markers marker={place} color="rgb(244, 81, 30)" />}
        {home && (
          <Marker
            latitude={home?.latitude}
            longitude={home?.longitude}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <TripOriginRoundedIcon
              sx={{ color: "rgb(66, 66, 66)", fontSize: "20px" }}
            />
          </Marker>
        )}
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
        {marker && <Markers marker={marker} color="rgb(142, 36, 170)" />}
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
