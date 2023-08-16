import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import styles from "../../styles/newGroupPublic.module.scss";

export default function Public() {
  const [isPublic, setIsPublic] = useState(false);
  const [count, setCount] = useState(0);

  const handleClickPublic = () => {
    setCount((prev) => prev + 1);
    if (count % 2 === 0) {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
  };

  return (
    <div className={styles.groupToCenter}>
      <div className={styles.newGroupTime}>
        <div className={styles.timeTitle}>
          <p>設為公開</p>
          <div className={styles.checkbox}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox size="small" />}
                onChange={handleClickPublic}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
