import { FC, useState } from "react";
import { Stack, Modal, Text, Image, FileInput, Button } from "@mantine/core";

import CenteredModal from "../CenteredModal";
import FoodForm from "../food/FoodForm";
import Dashboard from "../food/Dashboard";

import { Food } from "../../types/TFood";
import { User } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";

import Compressor from "compressorjs";

type Props = {
  user: User;
  foodList: Food[];
  avatarUrl: string;
};

const ProfilePage: FC<Props> = ({ user, foodList, avatarUrl }) => {
  const [opened, setOpened] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const supabase = useSupabaseClient();

  const handleAvatarUpload = async () => {
    if (avatar !== null) {
      const avatarFile = avatar;

      new Compressor(avatarFile, {
        quality: 0.8,
        mimeType: "image/jpeg",
        success: async (compressedResult) => {
          const { error } = await supabase.storage
            .from("avatar")
            .upload(user.id, compressedResult);

          if (error?.message.includes("duplicate")) {
            const { error } = await supabase.storage
              .from("avatar")
              .update(user.id, compressedResult);

            error === null
              ? showNotification({
                  title: `Image uploaded.`,
                  message: "Your avatar has been updated.",
                  color: "green",
                })
              : showNotification({
                  title: `Something went wrong.`,
                  message: "Please try again later.",
                  color: "red",
                });
          }
        },
      });
    }
  };

  return (
    <Stack align="center" mt="xl">
      <Image
        width={200}
        height={200}
        src={avatarUrl || null}
        alt="profile avatar"
        radius={100}
        withPlaceholder
        onClick={() => setOpened(true)}
      />
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Change your avatar"
      >
        <FileInput
          placeholder="avatar.jpg"
          label="Your Avatar"
          variant="filled"
          withAsterisk
          value={avatar}
          onChange={setAvatar}
          accept="image/*"
        />
        <Button type="submit" mt="sm" onClick={() => handleAvatarUpload()}>
          Upload
        </Button>
      </Modal>
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
