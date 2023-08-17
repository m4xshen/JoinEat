// import Image from "next/image";
import styles from "../styles/group.module.scss";

export default function Group({
  setGoEvent,
  isButtonDisable,
  shop_name,
  eventName,
}) {
  const handleClickEvent = (e) => {
    e.preventDefault();
    if (!isButtonDisable) {
      setGoEvent(true);
    }
  };
  return (
    <div>
      <button
        type="submit"
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        onClick={handleClickEvent}
      >
        <div type="submit" className={styles.group}>
          <div className={styles.basicInfo}>
            <picture>
              <img
                className={styles.userImg}
                src="/profileIcon.jpg"
                alt="profileIcon"
              />
            </picture>
            <div className={styles.time}>
              <div className={styles.eventTime}>
                <p>08:00</p>
              </div>
              <div className={styles.eventDate}>
                <p>07/27</p>
              </div>
            </div>
            <div className={styles.names}>
              <div className={styles.nameGroup}>{eventName}</div>
              <div className={styles.nameResturant}>{shop_name}</div>
            </div>
          </div>
          <div className={styles.detailInfo}>
            <div className={styles.peopleLimit}>
              <p>3/4</p>
              <picture>
                <img
                  className={styles.usersIcon}
                  src="/usersIcon 1.png"
                  alt="usersIcon"
                />
              </picture>
            </div>
            <div className={styles.distance}>300m</div>
          </div>
        </div>
      </button>
    </div>
  );
}
