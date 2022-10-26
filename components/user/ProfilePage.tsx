import { FC, useState } from "react";
import { Stack, Modal, Text, Image, FileInput, Button } from "@mantine/core";

import CenteredModal from "../CenteredModal";
import FoodForm from "../food/FoodForm";
import Dashboard from "../food/Dashboard";

import { Food } from "../../types/TFood";
import { User } from "@supabase/supabase-js";
import { showNotification } from "@mantine/notifications";

import Compressor from "compressorjs";
import supabaseClient from "../../utils/supabase";
import axios from "axios";

type Props = {
  user: User;
  foodList: Food[];
  avatarUrl: string;
};

const ProfilePage: FC<Props> = ({ user, foodList, avatarUrl }) => {
  const [opened, setOpened] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleAvatarUpload = async () => {
    setUploading(true);

    if (avatar !== null) {
      const avatarFile = avatar;

      new Compressor(avatarFile, {
        quality: 0.8,
        mimeType: "image/jpeg",
        success: async (compressedResult) => {
          const { data } = await supabaseClient.functions.invoke(
            "imageUploader",
            {
              body: compressedResult,
            }
          );
          const error = await axios.post("/api/user/profile-update", {
            newAvatarId: data.path,
            userId: user.id,
          });
          error === null
            ? showNotification({
                title: `Photo uploaded.`,
                message: "Your new avatar has been saved.",
                color: "green",
              })
            : showNotification({
                title: `There was a problem uploading your photo.`,
                message: "Please try again later.",
                color: "red",
              });
        },
      });

      setUploading(false);
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
        <Button
          type="submit"
          mt="sm"
          onClick={() => handleAvatarUpload()}
          disabled={uploading}
        >
          {uploading ? "Uploading" : "Upload"}
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
