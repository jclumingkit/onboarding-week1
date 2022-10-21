import { FC, useState } from "react";
import axios from "axios";
import { useForm } from "@mantine/form";
import { Group, TextInput, PasswordInput, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

type FormData = {
  email: string;
  password: string;
};

const SignInForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const addUser = async (values: FormData) => {
    setIsLoading(true);
    const { data, request } = await axios.post("/api/user/signin", values);
    if (request.status === 200) {
      console.log(data.user);
      setIsLoading(false);
      showNotification({
        title: `You are now registered!`,
        message: "Please check your email for the confirmation link.",
        color: "green",
      });
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
          Sign In
        </Button>
      </Group>
    </form>
  );
};

export default SignInForm;
