import { FoodType } from "../../data/foodData";

export function handleSortByRating(
  currentFoodList: FoodType[],
  toggleSortButton: boolean
) {
  const sortedResults = currentFoodList.sort((foodItemA, foodItemB) => {
    if (!toggleSortButton) {
      return foodItemB.rating - foodItemA.rating;
    } else {
      return foodItemA.rating - foodItemB.rating;
    }
  });

  return sortedResults;
}

export function handleSearchByName(query: string, [...foodStorage]) {
  const searchResults = [...foodStorage].filter((foodItem) =>
    foodItem.name.toLowerCase().includes(query.toLowerCase())
  );

  return searchResults;
}
