import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import Button from "../Button";
import Time from "./Time";
import DateSelect from "./DateSelect";
import Limit from "./Limit";
import Public from "./Public";
import Group from "../Group";
import EventName from "./EventName";
import styles from "../../styles/launchGroup.module.scss";
import Cancel from "../Icons/Cancel";
import { hourOptions, minuteOptions } from "./timeOptions";
import {
  nowYear,
  roundUpToNearestMultipleOf5,
  monthOptions,
  daysInMonth,
} from "./dateOptions";

export default function LaunchGroup({
  shop_name,
  latitude,
  longitude,
  setOpenGroup,
}) {
  const today = new Date();
  const hr = today.getHours();
  const formattedHr = hr.toString().padStart(2, "0");
  console.log(formattedHr);
  const nowMintues = today.getMinutes();
  const access_token = getCookie("access_token");
  const isButtonDisable = true;
  const [isLaunch, setIsLaunch] = useState(false);
  const [event_name, setEventName] = useState("");
  const [is_public, setIsPublic] = useState(true);
  const [year, setYear] = useState(nowYear);
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [date, setDate] = useState(today.getDate());
  const [hour, setHour] = useState(formattedHr);
  const [minute, setMinute] = useState(roundUpToNearestMultipleOf5(nowMintues));
  const [people_limit, setPeopleLimit] = useState(2);
  const appointment_time = { year, month, date, hour, minute };
  const eventTime = { month, date, hour, minute };

  const handleClickPublic = () => {
    setIsPublic(!is_public);
  };

  const handleEventName = (e) => {
    setEventName(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsLaunch(true);
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/events/`,
        {
          latitude,
          longitude,
          shop_name,
          event_name,
          is_public,
          appointment_time,
          people_limit,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("出現錯誤!");
        console.log(error);
      });
  };

  console.log(event_name);
  return (
    <div className={styles.lauchGroup}>
      <div className={styles.titleBar}>
        <button
          type="button"
          onClick={() => {
            setOpenGroup(false);
          }}
        >
          <Cancel />
        </button>
      </div>
      <Group
        isButtonDisable={isButtonDisable}
        shop_name={shop_name}
        eventName={event_name}
        eventTime={eventTime}
        people_joined={1}
        // eventDistance={year}
        people_limit={people_limit}
      />
      <EventName eventName={event_name} callback={handleEventName} />
      <Time
        hourOptions={hourOptions}
        minuteOptions={minuteOptions}
        hour={hour}
        minute={minute}
        setHour={setHour}
        setMinute={setMinute}
      />
      <DateSelect
        nowYear={nowYear}
        monthOptions={monthOptions}
        daysInMonth={daysInMonth}
        year={year}
        month={month}
        date={date}
        setYear={setYear}
        setMonth={setMonth}
        setDate={setDate}
      />
      <Limit people_limit={people_limit} setPeopleLimit={setPeopleLimit} />
      <Public handleClickPublic={handleClickPublic} />
      <Button text="發起" callback={handleClick} status={isLaunch} />
    </div>
  );
}
