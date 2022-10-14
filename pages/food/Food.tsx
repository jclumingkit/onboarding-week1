import styles from "./Food.module.css";

import { FC, useMemo } from "react";
import foodData from "../../data/foodData";
import { FoodType } from "../../data/foodData";

import FoodCard from "./foodCard/FoodCard";

const Food: FC = () => {
  const foodList: FoodType[] = useMemo(() => {
    return [...foodData];
  }, []);

  return (
    <div className={styles.section}>
      {foodList.map((foodItem) => (
        <FoodCard key={foodItem.id} foodItem={foodItem} />
      ))}
    </div>
  );
};

export default Food;
