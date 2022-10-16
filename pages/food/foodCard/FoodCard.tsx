import styles from "./FoodCard.module.css";

import { FC } from "react";
import Image from "next/image";
import { FoodType } from "../../../data/foodData";

const FoodCard: FC<{ foodItem: FoodType }> = ({ foodItem }) => {
  const rating = new Array(foodItem.rating).fill("⭐");

  return (
    <div className={styles.card}>
      <div>
        <Image
          priority
          src={foodItem.image}
          width={600}
          height={400}
          alt={foodItem.name}
        />
        <h2>{foodItem.name}</h2>
        <p>
          <span className={styles.description}>{foodItem.description}</span>
        </p>
      </div>
      <h1>{rating}</h1>
    </div>
  );
};

export default FoodCard;
