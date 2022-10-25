import styles from "./Food.module.css";

import { useState, useEffect, useMemo } from "react";

import { Space, TextInput, Center } from "@mantine/core";

import foodData from "../../data/foodData";
import { FoodType } from "../../data/foodData";
import FoodCard from "../../components/food/foodCard/FoodCard";
import HomeButton from "../../components/homeButton/HomeButton";
import FoodSortButton from "../../components/food/FoodSortButton";
import CenteredModal from "../../components/CenteredModal";
import FoodForm from "../../components/food/FoodForm";

import { handleSortByRating, handleSearchByName } from "../../functions/food";

const Food = () => {
  const [foodStorage, setFoodStorage] = useState<FoodType[]>([]);
  const [searchFoodListInput, setSearchFoodListInput] = useState("");
  const [toggleSortButton, setToggleSortButton] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    setAnimateCard(true);
    localStorage.setItem("foodData", JSON.stringify(foodData));
    setFoodStorage(JSON.parse(localStorage.foodData));
  }, [setFoodStorage]);

  const foodList = useMemo(() => {
    const searchResults = handleSearchByName(searchFoodListInput, foodStorage);
    const sortedResults = handleSortByRating(searchResults, toggleSortButton);

    return sortedResults;
  }, [searchFoodListInput, toggleSortButton, foodStorage]);

  return (
    <div className={styles.section}>
      <div className={styles.filterContainer}>
        <TextInput
          size="md"
          value={searchFoodListInput}
          onChange={(e) => setSearchFoodListInput(e.target.value)}
          placeholder="Search food here..."
        />
        <Space h="xs" />
        <Center>
          <CenteredModal
            childComponent={<FoodForm user={null} />}
            buttonText={"Food+"}
          />
          <FoodSortButton
            toggleSortButton={toggleSortButton}
            setToggleSortButton={setToggleSortButton}
          />
          <HomeButton />
        </Center>
      </div>

      <div
        className={`${styles.cardContainer} ${
          animateCard && styles.cardAnimate
        }`}
      >
        {foodList.length <= 0 ? (
          <h1 style={{ marginTop: "50px" }}>Food not found</h1>
        ) : (
          foodList.map((foodItem) => (
            <FoodCard key={foodItem.id} foodItem={foodItem} />
          ))
        )}
      </div>
    </div>
  );
};

export default Food;
