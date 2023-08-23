"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import styles from "@/styles/groups.module.scss";
import MapWrapper from "@/components/MapWrapper";
import Groups from "@/components/Groups";
import SearchBarById from "@/components/SearchBarById";
import GroupsSearchResult from "@/components/GroupsSearchResult";
import GroupDetail from "@/components/GroupDetail";

export default function Home() {
  const access_token = getCookie("access_token");
  const [options, setOptions] = useState();
  const [shop_name, setShopName] = useState();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const [content, setContent] = useState(null);
  const [keyword, setSearchGroup] = useState("");
  const [groupsSearchResult, setGroupsSearchResult] = useState("");
  const [activeEventId, setActiveEventId] = useState(null);
  const [openGroup, setOpenGroup] = useState(false);

  useEffect(() => {
    if (center.lat === 0 && center.lng === 0) {
      console.log("loading");
      return;
    }

    if (!options?.position && !activeEventId) {
      setContent(
        <Groups
          access_token={access_token}
          latitude={center.lat}
          longitude={center.lng}
          position={options?.position}
          shop_name={shop_name}
          setActiveEventId={setActiveEventId}
          keyword={keyword}
          setSearchGroup={setSearchGroup}
          openGroup={openGroup}
          setOpenGroup={setOpenGroup}
        />,
      );
    } else {
      setContent(
        <Groups
          access_token={access_token}
          latitude={center.lat}
          longitude={center.lng}
          latitudeShop={options?.position.lat}
          longitudeShop={options?.position.lng}
          position={options?.position}
          shop_name={shop_name}
          setActiveEventId={setActiveEventId}
          keyword={keyword}
          setSearchGroup={setSearchGroup}
          openGroup={openGroup}
          setOpenGroup={setOpenGroup}
        />,
      );
    }
  }, [options, center, options?.position?.lng, openGroup]);

  useEffect(() => {
    if (keyword !== "") {
      console.log(keyword);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/events/search`, {
          params: { keyword, latitude: center.lat, longitude: center.lng },
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((response) => {
          console.log(response);
          setGroupsSearchResult(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [keyword]);

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "100%" }}>
      <MapWrapper
        center={center}
        setCenter={setCenter}
        options={options}
        setOptions={setOptions}
        setShopName={setShopName}
        setActiveEventId={setActiveEventId}
      />

      <div className={styles.groups}>
        {!openGroup && (
          <SearchBarById
            searchGroup={keyword}
            setSearchGroup={setSearchGroup}
          />
        )}
        {keyword === "" ? (
          content
        ) : (
          <GroupsSearchResult
            groupsSearchResult={groupsSearchResult}
            setActiveEventId={setActiveEventId}
            keyword={keyword}
            setSearchGroup={setSearchGroup}
          />
        )}
      </div>
      {activeEventId && (
        <GroupDetail
          center={center}
          setActiveEventId={setActiveEventId}
          eventId={activeEventId}
        />
      )}
    </div>
  );
}
