import Image from "next/image";
import styles from "../styles/searchBarById.module.scss";

export default function SearchBarById({ searchGroup, setSearchGroup }) {
  return (
    <div className={styles.searchBarPosition}>
      <div className={styles.searchBar}>
        <div className={styles.searchIconStartPoint}>
          <Image
            className={styles.searchIcon}
            width={15}
            height={15}
            src="/searchIcon 2.png"
            alt="Search Icon"
          />
          <input
            className={styles.input}
            type="text"
            placeholder="以團號搜尋"
            value={searchGroup}
            onChange={(e) => setSearchGroup(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
