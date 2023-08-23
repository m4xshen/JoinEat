import Image from "next/image";
import Link from "next/link";
import { deleteCookie, getCookie } from "cookies-next";
import { useState } from "react";
import styles from "@/styles/navBar.module.scss";
import useOutsideClick from "@/hooks/useOutsideClick";

export default function NavBar() {
  const [showDropDown, setShowDropDown] = useState(false);
  const userId = getCookie("user_id");

  const handleClick = () => {
    setShowDropDown(true);
  };
  const handleClickOutside = () => {
    setShowDropDown(false);
  };
  const ref = useOutsideClick(handleClickOutside);

  return (
    // <div
    //   onMouseEnter={() => {
    //     setShowDropDown(true);
    //   }}
    //   onMouseLeave={() => {
    //     setShowDropDown(false);
    //   }}
    // >
    //   <div className={styles.imageWrapper}>
    //     <Image
    //       width={25}
    //       height={25}
    //       src="/profileIcon 1.jpg"
    //       alt="profile icon"
    //       className={styles.profileIcon}
    //       onClick={() => {
    //         setShowDropDown(true);
    //       }}
    //     />
    //   </div>
    <div>
      <button
        ref={ref}
        type="button"
        className={styles.imageWrapper}
        onClick={handleClick}
      >
        <Image
          width={25}
          height={25}
          src="/profileIcon 1.jpg"
          alt="profile icon"
          className={styles.profileIcon}
          // onClick={() => {
          //   setShowDropDown(true);
          // }}
        />
      </button>

      {/* <div className={styles.blank} /> */}
      <div className={`${styles.dropDown} ${!showDropDown && styles.hidden}`}>
        <Link href={`/users/${userId}`} className={styles.link}>
          查看個人檔案
        </Link>
        <Link
          href="/login"
          className={styles.link}
          onClick={() => {
            deleteCookie("access_token");
            deleteCookie("user_id");
          }}
        >
          登出
        </Link>
      </div>
    </div>
  );
}
