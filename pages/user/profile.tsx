import { Container } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import ProfilePage from "../../components/user/ProfilePage";
import { User } from "@supabase/supabase-js";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Food } from "../../types/TFood";

type Props = {
  user: User;
  foodList: Food[];
};

const Profile: NextPage<Props> = ({ user, foodList }) => {
  console.log(foodList);
  return (
    <Container>
      <Head>
        <title>Your Profile</title>
        <meta
          name="description"
          content="Projects done during SCIC onboarding week 1."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ProfilePage foodList={foodList} user={user} />
      </main>
      <footer></footer>
    </Container>
  );
};

export default Profile;

export const getServerSideProps = withPageAuth({
  redirectTo: "/user/signin",
  async getServerSideProps(ctx, supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user?.id;
    const { data } = await supabase
      .from("food")
      .select("*")
      .eq("user_id", userId);
    console.log(data);
    return { props: { user: user, foodList: data } };
  },
});
