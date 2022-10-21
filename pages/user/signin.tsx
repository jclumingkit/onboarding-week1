import { Container } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import SignInPage from "../../components/user/SignInPage";

const SignIn: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Sign In</title>
        <meta
          name="description"
          content="Projects done during SCIC onboarding week 1."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SignInPage />
      </main>
      <footer></footer>
    </Container>
  );
};

export default SignIn;
