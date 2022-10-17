import styles from "./DarkModeButton.module.css";

import { IconSun, IconMoonStars } from "@tabler/icons";
import { Button, useMantineColorScheme } from "@mantine/core";

const DarkModeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <>
      <Button
        color={dark ? "yellow" : "dark"}
        className={styles.btn}
        onClick={() => toggleColorScheme()}
        size="md"
        aria-label="Toggle Dark Mode"
      >
        {dark ? <IconSun size={30} /> : <IconMoonStars size={30} />}
      </Button>
    </>
  );
};

export default DarkModeButton;
