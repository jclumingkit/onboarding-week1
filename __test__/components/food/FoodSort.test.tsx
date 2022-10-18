import { handleSortByRating } from "../../../functions/food";
import foodData from "../../../data/foodData";

const toggleSortButton = false;

describe("Test Food Sort", () => {
  it("toggleSortButton false value should sort FoodList from highest to lowest rating", () => {
    const foodList = handleSortByRating(foodData, toggleSortButton);
    const firstElement = foodList[0];
    const lastElement = foodList[foodList.length - 1];
    expect(firstElement.rating).toBeGreaterThan(lastElement.rating);
  });

  it("toggleSortButton true value should sort FoodList from highest to lowest rating", () => {
    const foodList = handleSortByRating(foodData, !toggleSortButton);
    const firstElement = foodList[0];
    const lastElement = foodList[foodList.length - 1];
    expect(firstElement.rating).toBeLessThan(lastElement.rating);
  });
});
