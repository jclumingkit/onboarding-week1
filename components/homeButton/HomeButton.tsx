import styles from "./HomeButton.module.css";

import { FC } from "react";
import { useRouter } from "next/router";

import { Button } from "@mantine/core";

const HomeButton: FC = () => {
  const router = useRouter();

  return (
    <Button
      type="button"
      color="red"
      className={styles.btnHome}
      onClick={() => router.push("/")}
    >
      Home
    </Button>
  );
};

export default HomeButton;
