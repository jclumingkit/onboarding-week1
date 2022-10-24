import { FC } from "react";
import { Stack, Avatar, Text } from "@mantine/core";
import { User } from "@supabase/supabase-js";

import CenteredModal from "../CenteredModal";
import FoodForm from "../food/FoodForm";
import Dashboard from "../food/Dashboard";

import { Food } from "../../types/TFood";

type Props = {
  user: User;
  foodList: Food[];
};

const ProfilePage: FC<Props> = ({ user, foodList }) => {
  return (
    <Stack align="center" mt="xl">
      <Avatar color="cyan" radius="xl">
        MK
      </Avatar>
      <Text>{user?.email}</Text>
      <CenteredModal
        childComponent={<FoodForm user={user} />}
        buttonText={"Add Food"}
      />
      <Dashboard foodList={foodList} />
    </Stack>
  );
};

export default ProfilePage;
