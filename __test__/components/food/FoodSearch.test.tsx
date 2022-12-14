import { handleSearchByName } from "../../../functions/food";
import foodData from "../../../data/foodData";

describe("Food Search", () => {
  it("should return FoodItem with name that includes input", () => {
    const input = "ch";
    const foodList = handleSearchByName(input, foodData);
    const everyFoodNameIncludesInput = foodList.every((foodItem) =>
      foodItem.name.toLowerCase().includes(input.toLowerCase())
    );

    expect(everyFoodNameIncludesInput).toBe(true);
  });
});
