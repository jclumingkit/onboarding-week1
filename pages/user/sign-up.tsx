import { NextPage } from "next";
import {
  Container,
  Center,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const SignUp: NextPage = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Container style={{ height: "100vh" }}>
      <Center style={{ height: "inherit" }}>
        <Text>Sign Up</Text>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            size="md"
            required
            withAsterisk
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Password"
            placeholder="Password"
            size="md"
            required
            withAsterisk
            {...form.getInputProps("password")}
          />

          <Group position="right" mt="md">
            <Button type="submit" size="md">
              Submit
            </Button>
          </Group>
        </form>
      </Center>
    </Container>
  );
};

export default SignUp;
