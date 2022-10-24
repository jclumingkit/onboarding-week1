import { Container } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import SignUpPage from "../../components/user/SignUpPage";

const SignUp: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Sign Up</title>
        <meta
          name="description"
          content="Projects done during SCIC onboarding week 1."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SignUpPage />
      </main>
      <footer></footer>
    </Container>
  );
};

export default SignUp;
