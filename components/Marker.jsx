import { useState, useEffect } from "react";

export default function Marker({ options, setShopName }) {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      console.log(options);
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
}
