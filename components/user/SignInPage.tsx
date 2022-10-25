import { FC, useState } from "react";
import { Container, Stack, Text, Button, SimpleGrid } from "@mantine/core";
import SignInForm from "./SignInForm";
import MagicLinkForm from "./MagicLinkForm";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const SignInPage: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const supabase = useSupabaseClient();

  const handleGoogleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    console.log(data);
    console.log(error);
  };

  const handleFacebookSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });

    console.log(data);
    console.log(error);
  };

  return (
    <Container style={{ height: "100vh" }}>
      <SimpleGrid mt="xl" cols={1}>
        <Stack align="center" style={{ display: showForm ? "none" : "block" }}>
          <Text size="xl" weight={700}>
            Sign In
          </Text>
          <SignInForm />
        </Stack>
        <Stack style={{ display: showForm ? "block" : "none" }}>
          <Text size="xl" weight={700}>
            Sign In with Magic Link
          </Text>
          <MagicLinkForm />
        </Stack>
        <Button
          variant="outline"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Sign In with Password" : "Sign In with Magic Link"}
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => handleGoogleSignin()}
        >
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => handleFacebookSignin()}
        >
          Facebook
        </Button>
      </SimpleGrid>
    </Container>
  );
};

export default SignInPage;
