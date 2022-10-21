import { NextPage } from "next";
import { Container, Center, Stack, Text } from "@mantine/core";
import SignInForm from "./SignInForm";

const SignInPage: NextPage = () => {
  return (
    <Container style={{ height: "100vh" }}>
      <Center style={{ height: "inherit" }}>
        <Stack>
          <Text size="xl" weight={700}>
            Sign In
          </Text>
          <SignInForm />
        </Stack>
      </Center>
    </Container>
  );
};

export default SignInPage;
