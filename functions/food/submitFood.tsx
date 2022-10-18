import * as yup from "yup";
export const foodSchema = yup
  .object({
    foodName: yup.string().required(),
    foodImageURL: yup.string().url().required(),
    foodDescription: yup.string().required(),
    foodRating: yup.number().positive().integer().required(),
  })
  .required();

export type FormData = {
  foodName: string;
  foodImageURL: string;
  foodDescription: string;
  foodRating: number;
};

export async function isImageValid(url: string) {
  try {
    const res = await fetch(url);
    const status = res.status;
    return status;
  } catch (err) {
    return err;
  }
}

const getNewFood = async (data: FormData, id: number) => {
  const newFood = {
    id: id,
    name: data.foodName,
    description: data.foodDescription,
    image: data.foodImageURL,
    rating: data.foodRating,
  };

  const isValid = await isImageValid(newFood.image);

  if (isValid === 200) {
    return newFood;
  } else {
    return undefined;
  }
};

export default getNewFood;
