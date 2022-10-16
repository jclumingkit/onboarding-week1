import styles from "./FoodCard.module.css";

import { FC, useRef, useState } from "react";
import Image from "next/image";
import { FoodType } from "../../../data/foodData";

const FoodCard: FC<{ foodItem: FoodType }> = ({ foodItem }) => {
  const [showFullImage, setShowFullImage] = useState<boolean | null>(null);
  const imageModalRef = useRef<HTMLDivElement | null>(null);
 

  const closeImageModal = () => {
    setShowFullImage(!showFullImage);
    imageModalRef.current?.classList.remove(styles.showImage);
  };

  const showImageModal = () => {
    setShowFullImage(!showFullImage);
    imageModalRef.current?.classList.add(styles.showImage);
  };

  return (
    <>
      <div
        className={styles.modal}
        ref={(ref) => (imageModalRef.current = ref)}
      >
        <Image
          priority
          src={foodItem?.image}
          layout="fill"
          objectFit="contain"
          alt={foodItem?.name}
        />

        <span className={styles.modalCloseButton} onClick={closeImageModal}>
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
            onClick={showImageModal}
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
