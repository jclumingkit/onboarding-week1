import styles from "./Food.module.css";

import { FC, useMemo, useState } from "react";
import foodData from "../../data/foodData";
import { FoodType } from "../../data/foodData";

import FoodCard from "./foodCard/FoodCard";

const Food: FC = () => {
  const [searchFoodListInput, setSearchFoodListInput] = useState("");

  const handleSearchByName = (query: string) => {
    const searchResults = [...foodData].filter((FoodItem) =>
      FoodItem.name.toLowerCase().includes(query.toLowerCase())
    );

    return searchResults;
  };

  const foodList: FoodType[] = useMemo(() => {
    const searchResults = handleSearchByName(searchFoodListInput);

    return searchResults;
  }, [searchFoodListInput]);

  return (
    <div className={styles.section}>
      <input
        type="text"
        value={searchFoodListInput}
        onChange={(e) => setSearchFoodListInput(e.target.value)}
        placeholder="Search food here..."
      />
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
