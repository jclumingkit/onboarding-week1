import { Dispatch, SetStateAction, FC } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Space,
} from "@mantine/core";

import { yupResolver } from "@hookform/resolvers/yup";

import { FoodType } from "../../../../data/foodData";

import Swal from "sweetalert2";
import getNewFood, {
  FormData,
  foodSchema,
} from "../../../../functions/food/submitFood";

type Props = {
  foodStorage: FoodType[];
  setFoodStorage: Dispatch<SetStateAction<FoodType[]>>;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const AddFoodModal: FC<Props> = (props) => {
  const { foodStorage, setFoodStorage, openModal, setOpenModal } = props;
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(foodSchema),
  });

  const addFoodItem = async () => {
    const formData: FormData = getValues();
    const newFood = await getNewFood(formData, foodStorage.length);
    if (newFood !== undefined) {
      const newFoodStorage: FoodType[] = [...foodStorage, ...[newFood]];
      setFoodStorage(newFoodStorage);
      setOpenModal(false);
      console.log(newFood);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your food is ready.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image URL invalid!",
      });
    }
  };

  return (
    <Modal
      centered
      size="lg"
      opened={openModal}
      onClose={() => setOpenModal(false)}
      title="Share Your Food"
    >
      <form onSubmit={handleSubmit(addFoodItem)}>
        <Controller
          name="foodName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              {...field}
              size="md"
              label="Food Name"
              placeholder={
                errors.foodName?.type !== "required" ? "Kaldereta" : ""
              }
              withAsterisk
              error={
                errors.foodName?.type === "required" && "Food name is required"
              }
            />
          )}
        />
        <Controller
          name="foodImageURL"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              {...field}
              size="md"
              label="Image URL"
              placeholder={
                errors.foodImageURL?.type !== "required"
                  ? "wwww.foodimages.com/kaldereta.jpg"
                  : ""
              }
              withAsterisk
              error={
                errors.foodImageURL?.type === "required" &&
                "Image URL is required"
              }
            />
          )}
        />
        <Controller
          name="foodDescription"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              {...field}
              size="md"
              label="Food Description"
              placeholder={
                errors.foodDescription?.type !== "required"
                  ? "Classic Filipino food made with love."
                  : ""
              }
              withAsterisk
              error={
                errors.foodDescription?.type === "required" &&
                "Description is required"
              }
            />
          )}
        />
        <Controller
          name="foodRating"
          control={control}
          defaultValue={3}
          render={({ field }) => (
            <NumberInput
              {...field}
              size="md"
              label="Rating"
              max={5}
              min={0}
              withAsterisk
              error={
                errors.foodRating?.type === "required" && "Rating is required"
              }
            />
          )}
        />
        <Space h="sm" />
        <Button fullWidth color="indigo" type="submit">
          Add Food
        </Button>
      </form>
    </Modal>
  );
};

export default AddFoodModal;
