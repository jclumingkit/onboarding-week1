import styles from "./FoodCard.module.css";

import { FC } from "react";
import Image from "next/image";
import { FoodType } from "../../../data/foodData";

const FoodCard: FC<{ foodItem: FoodType }> = ({ foodItem }) => {
  return (
    <div className={styles.card}>
      <Image
        priority
        src={foodItem.image}
        // className=""
        width={500}
        height={400}
        alt={foodItem.name}
      />
      <div>
        <h4>{foodItem.name}</h4>
        <p>{foodItem.description}</p>
        <p>Rating: {foodItem.rating}</p>
      </div>
    </div>
  );
};

export default FoodCard;
