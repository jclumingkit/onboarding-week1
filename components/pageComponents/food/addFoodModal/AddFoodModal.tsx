import { Dispatch, SetStateAction, FC, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Text,
  Space,
} from "@mantine/core";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FoodType } from "../../../../data/foodData";

import Swal from "sweetalert2";

type FormData = {
  foodName: string;
  foodImageURL: string;
  foodDescription: string;
  foodRating: number;
};

type Props = {
  foodStorage: FoodType[];
  setFoodStorage: Dispatch<SetStateAction<FoodType[]>>;
};

const foodSchema = yup
  .object({
    foodName: yup.string().required(),
    foodImageURL: yup.string().url().required(),
    foodDescription: yup.string().required(),
    foodRating: yup.number().positive().integer().required(),
  })
  .required();

const AddFoodModal: FC<Props> = (props) => {
  const { foodStorage, setFoodStorage } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(foodSchema),
  });
  const [openModal, setOpenModal] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const newFood = {
      id: foodStorage.length,
      name: data.foodName,
      description: data.foodDescription,
      image: data.foodImageURL,
      rating: data.foodRating,
    };

    const isValid = await checkIsImageValid(newFood.image);

    if (isValid === 200) {
      const newFoodStorage: FoodType[] = [...foodStorage, ...[newFood]];
      setFoodStorage(newFoodStorage);
      setOpenModal(false);
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

  const checkIsImageValid = async (url: string) => {
    try {
      const res = await fetch(url);
      const status = res.status;
      return status;
    } catch (err) {
      return err;
    }
  };

  return (
    <div>
      <Modal
        centered
        size="lg"
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Share Your Food"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  errors.foodName?.type === "required" &&
                  "Food name is required"
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
          <Text color="red">{errors.foodImageURL?.message}</Text>
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
      <Button fullWidth color="indigo" onClick={() => setOpenModal(true)}>
        Add Food
      </Button>
    </div>
  );
};

export default AddFoodModal;
