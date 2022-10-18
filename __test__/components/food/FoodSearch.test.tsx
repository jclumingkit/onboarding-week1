import { handleSearchByName } from "../../../functions/food";
import foodData from "../../../data/foodData";

describe("Test Food Search", () => {
  it("should return FoodItem with name that includes input", () => {
    const input = "ca";
    const foodList = handleSearchByName(input, foodData);
    const everyFoodNameIncludesInput = foodList.every((foodItem) =>
      foodItem.name.toLowerCase().includes(input.toLowerCase())
    );

    expect(everyFoodNameIncludesInput).toBe(true);
  });
});
