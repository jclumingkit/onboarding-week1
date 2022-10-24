import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import AddFoodModal from "../../../../components/food/AddFoodModal";

const mockSetFoodStorage = jest.fn();

describe("AddFood", () => {
  beforeEach(() => {
    render(
      <AddFoodModal
        foodStorage={[]}
        setFoodStorage={mockSetFoodStorage}
        openModal={true}
        setOpenModal={jest.fn()}
      />
    );
  });

  it("check validation with empty inputs", async () => {
    const submitBtn = screen.getByRole("button", { name: "Add Food" });
    await act(async () => {
      fireEvent.submit(submitBtn);
    });

    const foodNameError = screen.getByText("Food name is required");
    const imageURLError = screen.getByText("Image URL is required");
    const foodDescriptionError = screen.getByText("Description is required");
    // food rating is not included because it has a default value

    expect(foodNameError).toBeInTheDocument();
    expect(imageURLError).toBeInTheDocument();
    expect(foodDescriptionError).toBeInTheDocument();
  });
});
