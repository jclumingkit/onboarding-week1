import styles from "./Food.module.css";

import { FC, useMemo, useState } from "react";
import foodData from "../../data/foodData";
import { FoodType } from "../../data/foodData";

import FoodCard from "./foodCard/FoodCard";

const Food: FC = () => {
  const [searchFoodListInput, setSearchFoodListInput] = useState("");
  const [toggleSortButton, setToggleSortButton] = useState(false);

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
        return foodItemA.rating - foodItemB.rating;
      } else {
        return foodItemB.rating - foodItemA.rating;
      }
    });

    return sortedResults;
  };

  const foodList: FoodType[] = useMemo(() => {
    const searchResults = handleSearchByName(searchFoodListInput);
    const sortedResults = handleSortByRating(searchResults, toggleSortButton);

    return sortedResults;
  }, [searchFoodListInput, toggleSortButton]);

  return (
    <div className={styles.section}>
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
        Rating {toggleSortButton ? "↓" : "↑"}
      </button>
      {foodList.length <= 0 ? (
        <h6>Food not found</h6>
      ) : (
        foodList.map((foodItem) => (
          <FoodCard key={foodItem.id} foodItem={foodItem} />
        ))
      )}
    </div>
  );
};

export default Food;
