import { FC, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Group, TextInput, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const MagicLinkForm: FC = () => {
  const supabase = useSupabaseClient();
  const [suspendForm, setSuspendForm] = useState(false);
  const [counter, setCounter] = useState(60);
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  useEffect(() => {
    if (suspendForm) {
      const timer = setInterval(function () {
        setCounter(counter - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [suspendForm, counter]);

  const sendMagicLink = async (values: { email: string }) => {
    setSuspendForm(true);
    setTimeout(function () {
      setSuspendForm(false);
      setCounter(60);
    }, 60000);

    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
    });

    if (error === null) {
      showNotification({
        title: `Magic link sent!`,
        message: "Check your inbox and follow the link to login.",
        color: "green",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(sendMagicLink)}>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        size="md"
        required
        withAsterisk
        {...form.getInputProps("email")}
        disabled={suspendForm}
      />

      <Group position="right" mt="md">
        <Button color="grape" type="submit" size="md" disabled={suspendForm}>
          Send Magic Link {suspendForm && `in ${counter}s`}
        </Button>
      </Group>
    </form>
  );
};

export default MagicLinkForm;
