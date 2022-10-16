import styles from "./FoodCard.module.css";

import { FC, useState } from "react";
import Image from "next/image";
import { FoodType } from "../../../data/foodData";

const FoodCard: FC<{ foodItem: FoodType }> = ({ foodItem }) => {
  const [showImageFullScreen, setShowImageFullScreen] = useState(false);
  const rating = new Array(foodItem.rating).fill("⭐");

  return (
    <>
      {showImageFullScreen && (
        <div className={styles.modal}>
          <Image
            priority
            src={foodItem.image}
            layout="fill"
            objectFit="contain"
            alt={foodItem.name}
          />
          <span
            className={styles.modalCloseButton}
            onClick={() => setShowImageFullScreen(!showImageFullScreen)}
          >
            &times;
          </span>
        </div>
      )}
      <div className={styles.card}>
        <div>
          <Image
            priority
            src={foodItem.image}
            width={600}
            height={400}
            alt={foodItem.name}
            onClick={() => setShowImageFullScreen(!showImageFullScreen)}
          />
          <h2>{foodItem.name}</h2>
          <p>
            <span className={styles.description}>{foodItem.description}</span>
          </p>
        </div>
        <h1>{rating}</h1>
      </div>
    </>
  );
};

export default FoodCard;
