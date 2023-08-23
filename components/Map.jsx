import { useRef, useEffect } from "react";
import styles from "@/styles/map.module.scss";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

export default function Map({
  children,
  center,
  setOptions,
  setShopName,
  setActiveEventId,
}) {
  const userMarker = useRef(null);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 18,
      disableDefaultUI: true,
    });

    const service = new window.google.maps.places.PlacesService(
      mapInstance.current,
    );

    mapInstance.current.addListener("click", (e) => {
      const { placeId } = e;
      if (!placeId) {
        setActiveEventId(null);
        setOptions({ map: null });

        return;
      }

      // prevent the default popup window
      e.stop();

      service.getDetails(
        {
          placeId,
        },
        (place, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            (place.types.includes("restaurant") || place.types.includes("cafe"))
          ) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setOptions({ position: { lat, lng }, map: mapInstance.current });
            setShopName(place.name);
            console.log("place.name", place.name);
            console.log(`${place.name}\n(${lat}, ${lng})`);
          } else {
            console.log("請點擊餐廳");
          }
        },
      );
    });

    userMarker.current = new window.google.maps.Marker({
      position: center,
      map: mapInstance.current,
      title: "你的位置",
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillOpacity: 1,
        strokeWeight: 2,
        fillColor: "#5384ED",
        strokeColor: "#ffffff",
      },
    });
  }, [center, setOptions]);

  return (
    <>
      <SearchBar
        center={center}
        setOptions={setOptions}
        setShopName={setShopName}
        mapInstance={mapInstance}
      />
      <NavBar />
      <div ref={mapRef} className={styles.map}>
        {children}
      </div>
    </>
  );
}
