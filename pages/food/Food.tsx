import styles from "./Food.module.css";

import { useState, useEffect, useMemo } from "react";

import { Button, Space, TextInput, Group } from "@mantine/core";

import foodData from "../../data/foodData";
import { FoodType } from "../../data/foodData";
import FoodCard from "../../components/pageComponents/food/foodCard/FoodCard";
import AddFoodModal from "../../components/pageComponents/food/addFoodModal/AddFoodModal";

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

  const handleSearchByName = (query: string, [...foodStorage]) => {
    const searchResults = [...foodStorage].filter((foodItem) =>
      foodItem.name.toLowerCase().includes(query.toLowerCase())
    );

    return searchResults;
  };

  const handleSortByRating = (
    currentFoodList: FoodType[],
    toggleSortButton: boolean
  ) => {
    const sortedResults = currentFoodList.sort((foodItemA, foodItemB) => {
      if (!toggleSortButton) {
        return foodItemB.rating - foodItemA.rating;
      } else {
        return foodItemA.rating - foodItemB.rating;
      }
    });

    return sortedResults;
  };

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
        <Group spacing="sm">
          <AddFoodModal
            foodStorage={foodStorage}
            setFoodStorage={setFoodStorage}
          />
          <Button
            size="md"
            type="button"
            color="yellow"
            onClick={() => setToggleSortButton(!toggleSortButton)}
          >
            Rating {toggleSortButton ? "↑" : "↓"}
          </Button>
        </Group>
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
