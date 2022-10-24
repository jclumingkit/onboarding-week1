import styles from "./FoodCard.module.css";

import cn from "classnames";

import { FC, useRef, useState } from "react";
import Image from "next/image";
import { FoodType } from "../../../data/foodData";

const FoodCard: FC<{ foodItem: FoodType }> = ({ foodItem }) => {
  const [showFullImage, setShowFullImage] = useState<boolean | null>(null);
  const imageModalRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div
        className={cn(styles.modal, showFullImage && styles.showImage)}
        ref={(ref) => (imageModalRef.current = ref)}
      >
        <Image
          src={foodItem?.image}
          layout="fill"
          objectFit="contain"
          alt={foodItem?.name}
          loading="lazy"
        />

        <span
          className={styles.modalCloseButton}
          onClick={() => setShowFullImage(!showFullImage)}
        >
          &times;
        </span>
      </div>
      <div className={styles.card}>
        <div>
          <Image
            priority
            src={foodItem?.image}
            width={600}
            height={400}
            alt={foodItem?.name}
            onClick={() => setShowFullImage(!showFullImage)}
            blurDataURL="data:..."
            placeholder="blur"
          />
          <h2>{foodItem?.name}</h2>
          <p>
            <span className={styles.description}>{foodItem?.description}</span>
          </p>
        </div>
        <h1>{Array(foodItem?.rating).fill("⭐")}</h1>
      </div>
    </>
  );
};

export default FoodCard;
