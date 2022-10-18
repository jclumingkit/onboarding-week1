import styles from "./Food.module.css";

import { useState, useEffect, useMemo } from "react";

import { Space, TextInput, Center } from "@mantine/core";

import foodData from "../../data/foodData";
import { FoodType } from "../../data/foodData";
import FoodCard from "../../components/pageComponents/food/foodCard/FoodCard";
import AddFoodModal from "../../components/pageComponents/food/addFoodModal/AddFoodModal";
import HomeButton from "../../components/homeButton/HomeButton";
import FoodSortButton from "../../components/pageComponents/food/foodSortButton/FoodSortButton";

// functions
import { handleSortByRating, handleSearchByName } from "../../functions/food";
import OpenModalButton from "../../components/OpenModalButton";

const Food = () => {
  const [foodStorage, setFoodStorage] = useState<FoodType[]>([]);
  const [searchFoodListInput, setSearchFoodListInput] = useState("");
  const [toggleSortButton, setToggleSortButton] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
          <OpenModalButton innerText="Food+" setOpenModal={setOpenModal} />
          <AddFoodModal
            foodStorage={foodStorage}
            setFoodStorage={setFoodStorage}
            openModal={openModal}
            setOpenModal={setOpenModal}
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
