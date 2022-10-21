import { NextPage } from "next";
import { Container, Center, Stack, Text } from "@mantine/core";
import SignUpForm from "./SignUpForm";

const SignUpPage: NextPage = () => {
  return (
    <Container style={{ height: "100vh" }}>
      <Center style={{ height: "inherit" }}>
        <Stack>
          <Text size="xl" weight={700}>
            Sign Up
          </Text>
          <SignUpForm />
        </Stack>
      </Center>
    </Container>
  );
};

export default SignUpPage;
