import styles from "./HomeButton.module.css";
import { useRouter } from "next/router";

import { FC } from "react";

const HomeButton: FC = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.btnHome}
      onClick={() => router.push("/")}
    >
      Return Home
    </button>
  );
};

export default HomeButton;
