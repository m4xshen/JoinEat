/* eslint-disable react/jsx-no-bind */

"use client";

import { useEffect, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import styles from "@/styles/map.module.scss";
import Map from "./Map";
import Marker from "./Marker";

export default function MapWrapper({
  center,
  setCenter,
  options,
  setOptions,
  setShopName,
  setActiveEventId,
}) {
  function success(pos) {
    setCenter({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    });
  }

  function error() {
    console.log("無法取得您的位置，請開啟位置存取權限");
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  function render(status) {
    if (status === Status.FAILURE) {
      return "Error";
    }
    return <div className={styles.map}>Loading Map...</div>;
  }

  return (
    <Wrapper
      language="zh-TW"
      region="TW"
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
      render={render}
      libraries={["places"]}
    >
      <Map
        center={center}
        setOptions={setOptions}
        setShopName={setShopName}
        setActiveEventId={setActiveEventId}
      >
        <Marker options={options} setShopName={setShopName} />
      </Map>
    </Wrapper>
  );
}
