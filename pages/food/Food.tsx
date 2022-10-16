import styles from "./Food.module.css";

import { FC, useMemo, useState, useEffect } from "react";

import foodData from "../../data/foodData";
import { FoodType } from "../../data/foodData";
import FoodCard from "../../components/pageComponents/food/foodCard/FoodCard";

const Food: FC = () => {
  const [searchFoodListInput, setSearchFoodListInput] = useState("");
  const [toggleSortButton, setToggleSortButton] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  const handleSearchByName = (query: string) => {
    const searchResults = [...foodData].filter((FoodItem) =>
      FoodItem.name.toLowerCase().includes(query.toLowerCase())
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

  const foodList: FoodType[] = useMemo(() => {
    const searchResults = handleSearchByName(searchFoodListInput);
    const sortedResults = handleSortByRating(searchResults, toggleSortButton);

    return sortedResults;
  }, [searchFoodListInput, toggleSortButton]);

  useEffect(() => {
    setAnimateCard(true);
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.filterContainer}>
        <input
          type="text"
          value={searchFoodListInput}
          onChange={(e) => setSearchFoodListInput(e.target.value)}
          placeholder="Search food here..."
        />
        <button
          type="button"
          onClick={() => setToggleSortButton(!toggleSortButton)}
        >
          Rating {toggleSortButton ? "↑" : "↓"}
        </button>
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
