import { FC, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "@mantine/form";
import { Group, TextInput, PasswordInput, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type FormData = {
  email: string;
  password: string;
};

const SignInForm: FC = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
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
    const { data } = await supabase.auth.signInWithPassword(values);
    if (data.user !== null) {
      setIsLoading(false);
      router.push("/user/profile");
    } else {
      setIsLoading(false);
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
        type="email"
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
        <Button id="btn-signin" type="submit" size="md" disabled={isLoading}>
          Sign In
        </Button>
      </Group>
    </form>
  );
};

export default SignInForm;
