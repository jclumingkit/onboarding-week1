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
