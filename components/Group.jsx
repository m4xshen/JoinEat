import Image from "next/image";
import styles from "../styles/group.module.scss";
import useProfile from "@/hooks/useProfile";

export default function Group({
  hostId,
  eventTime,
  eventDistance,
  setActiveEventId,
  eventId,
  shop_name,
  eventName,
  people_joined,
  people_limit,
  isButtonDisable,
}) {
  const handleClickEvent = (e) => {
    e.preventDefault();
    setActiveEventId(eventId);
  };

  const profile = useProfile(hostId);

  return (
    <div>
      <button
        className={styles.button}
        type="submit"
        disabled={isButtonDisable}
        onClick={handleClickEvent}
      >
        <div type="submit" className={styles.group}>
          <div className={styles.basicInfo}>
            <div className={styles.imageWrapper}>
              <Image
                className={styles.userImg}
                src={profile?.picture ?? "/profileIcon.png"}
                alt="profileIcon"
                fill
              />
            </div>
            <div className={styles.time}>
              <div className={styles.eventTime}>
                {eventTime !== undefined && (
                  <p>
                    {eventTime.hour}:{eventTime.minute}
                  </p>
                )}
              </div>
              <div className={styles.eventDate}>
                {eventTime !== undefined && (
                  <p>
                    {eventTime.month}/{eventTime.date}
                  </p>
                )}
              </div>
            </div>
            <div className={styles.names}>
              <div className={styles.nameGroup}>{eventName}</div>
              <div className={styles.nameResturant}>{shop_name}</div>
            </div>
          </div>
          <div className={styles.detailInfo}>
            <div className={styles.peopleLimit}>
              <p>
                {people_joined}/{people_limit}
              </p>
              <picture>
                <img
                  className={styles.usersIcon}
                  src="/usersIcon 1.png"
                  alt="usersIcon"
                />
              </picture>
            </div>
            {eventDistance && (
              <div className={styles.distance}>{eventDistance}m</div>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
