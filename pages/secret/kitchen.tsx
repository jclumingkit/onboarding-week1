import type { NextPage } from "next";
import Head from "next/head";
import { Center, Container } from "@mantine/core";
import { Food } from "../../types/TFood";
import supabaseClient from "../../utils/supabase";

import Dashboard from "../../components/food/Dashboard";

type Props = {
  foodList: Food[];
};

const Kitchen: NextPage<Props> = ({ foodList }) => {
  return (
    <Container>
      <Head>
        <title>Secret Kitchen</title>
        <meta
          name="description"
          content="Projects done during SCIC onboarding week 1."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Center style={{ height: "100vh" }}>
          <Dashboard foodList={foodList} />
        </Center>
      </main>
      <footer></footer>
    </Container>
  );
};

export default Kitchen;

export async function getServerSideProps() {
  const { data, error } = await supabaseClient
    .from("food")
    .select("*")
    .eq("is_public", true);
  console.log(error);

  return {
    props: {
      foodList: data,
    },
  };
}
