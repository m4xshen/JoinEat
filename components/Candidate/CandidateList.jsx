import { useState } from "react";
import Candidate from "./Candidate";
import Button from "../Button";
import styles from "../../styles/candidateList.module.scss";

export default function CandidateList() {
  const event_user = "tsai";
  const user = "robot";
  const [isJoined, setIsJoined] = useState(false);
  const handleJoined = (e) => {
    e.preventDefault();
    setIsJoined(!isJoined);
  };
  const handleCopy = (e) => {
    e.preventDefault();
    // 執行copy
  };
  const handleDeletEvent = (e) => {
    e.preventDefault();
    // 執行 axios.delete
  };

  const userCheck = event_user === user;
  let content = null;
  if (userCheck === false) {
    content =
      isJoined === false ? (
        <Button text="加入" callback={handleJoined} status={isJoined} />
      ) : (
        <Button text="取消" callback={handleJoined} status={isJoined} />
      );
  } else {
    content = (
      <div className={styles.groupDecision}>
        <Button text="複製團號" callback={handleCopy} status={isJoined} />
        <div style={{ width: "2%", margin: "0 2%" }} />
        <Button text="解散此團" callback={handleDeletEvent} status={isJoined} />
      </div>
    );
  }

  return (
    <div className={styles.groupToCenter}>
      <div className={styles.candidateList}>
        <div className={styles.title}>
          <p>人數上限</p>
        </div>
        <div className={styles.candidate}>
          <Candidate />
        </div>
        {content}
      </div>
    </div>
  );
}
