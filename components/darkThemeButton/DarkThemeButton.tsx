import styles from "./DarkThemeButton.module.css";
import Darkmode from "darkmode-js";

export default function DarkThemeButton() {
  const options = {
    top: "32px",
    right: "32px",
    mixColor: "#fff",
    backgroundColor: "#fff",
    buttonColorDark: "#100f2c",
    buttonColorLight: "#fff",
    saveInCookies: false,
    label: "🌓",
    autoMatchOsTheme: true,
  };

  const darkmode = new Darkmode(options);

  return <div className={styles.buttonContainer}>{darkmode.showWidget()}</div>;
}
