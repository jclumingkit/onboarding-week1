import { FC, useState } from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { Group, TextInput, PasswordInput, Button } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { IconCheck } from "@tabler/icons";

type FormData = {
  email: string;
  password: string;
};

const SignUpForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must have 6 characters" : null,
    },
  });

  const addUser = async (values: FormData) => {
    setIsLoading(true);
    showNotification({
      id: "sign-up-form-loader",
      title: `Sign up on going...`,
      message: "Please wait. This won't take too long.",
      color: "green",
      loading: true,
    });
    const { request } = await axios.post("/api/user/signup", values);
    if (request.status === 200) {
      updateNotification({
        id: "sign-up-form-loader",
        title: `Sign up successful.`,
        message: "Please sign in with your registration details.",
        color: "green",
        loading: false,
        icon: <IconCheck size={16} />,
      });
      setIsLoading(false);
      router.push("/user/signin");
    } else {
      showNotification({
        title: `Someting went wrong.`,
        message: "Please try again later.",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(addUser)}>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        size="md"
        required
        withAsterisk
        {...form.getInputProps("email")}
        disabled={isLoading}
      />

      <PasswordInput
        label="Password"
        placeholder="Password"
        size="md"
        required
        withAsterisk
        {...form.getInputProps("password")}
        disabled={isLoading}
      />

      <Group position="right" mt="md">
        <Button type="submit" size="md" disabled={isLoading}>
          {isLoading ? "Sending..." : "Sign Up"}
        </Button>
      </Group>
    </form>
  );
};

export default SignUpForm;
