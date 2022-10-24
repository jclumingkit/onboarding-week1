import { FC, useState } from "react";
import axios from "axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import {
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Space,
  NativeSelect,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";

type FormData = {
  foodName: string;
  foodImageURL: string;
  foodDescription: string;
  foodRating: number;
  foodPrivacy: string;
};

const foodSchema = yup
  .object({
    foodName: yup.string().required(),
    foodImageURL: yup.string().url().required(),
    foodDescription: yup.string().required(),
    foodRating: yup.number().positive().integer().required(),
    foodPrivacy: yup.string().required(),
  })
  .required();

const FoodForm: FC<{ user: User | null }> = ({ user }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(foodSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const checkImageUrl = async (url: string) => {
    try {
      const res = await fetch(url);
      const status = res.status;
      return status === 200 ? true : false;
    } catch (err) {
      return err;
    }
  };

  const addFood = async (data: FormData) => {
    setIsLoading(true);

    const isPublic = data.foodPrivacy === "public" ? true : false;

    const newFood = {
      name: data.foodName,
      user_id: user?.id,
      image: data.foodImageURL,
      description: data.foodDescription,
      rating: data.foodRating,
      is_public: isPublic,
    };

    try {
      const isImageUrlValid = await checkImageUrl(newFood.image);
      if (isImageUrlValid) {
        const response = await axios.post("/api/food/post", newFood);
        if (response.status === 200) {
          setIsLoading(false);

          reset({
            foodName: "",
            foodImageURL: "",
            foodDescription: "",
            foodRating: 3,
            foodPrivacy: "public",
          });
          showNotification({
            title: `Food saved!`,
            message: "Your food is saved in our cloud kitchen.",
            color: "green",
          });
        } else {
          showNotification({
            title: `Oops...`,
            message: "Something went wrong. Please try again later.",
            color: "red",
          });
        }
      } else {
        setIsLoading(false);
        showNotification({
          title: `Invalid Image`,
          message: "Your image url is invalid.",
          color: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(addFood)}>
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        )}
      />
      <Controller
        name="foodPrivacy"
        control={control}
        defaultValue={"public"}
        render={({ field }) => (
          <NativeSelect
            {...field}
            size="md"
            data={[
              { value: "public", label: "Public" },
              { value: "private", label: "Private" },
            ]}
            label="Share to public?"
            error={
              errors.foodPrivacy?.type === "required" &&
              "Food privacy is required"
            }
            withAsterisk
            disabled={isLoading}
          />
        )}
      />
      <Space h="sm" />
      <Button fullWidth color="indigo" type="submit" disabled={isLoading}>
        {isLoading ? "Sending your food to kitchen..." : "Add Food"}
      </Button>
    </form>
  );
};

export default FoodForm;
