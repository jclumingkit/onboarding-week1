import { Container } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import ProfilePage from "../../components/user/ProfilePage";
import { User } from "@supabase/supabase-js";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Food } from "../../types/TFood";
import { UserProfile } from "../../types/TUser";

type Props = {
  user: User;
  foodList: Food[];
  userProfile: UserProfile;
};

const Profile: NextPage<Props> = ({ user, foodList, userProfile }) => {
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
        <ProfilePage
          user={user}
          foodList={foodList}
          userProfile={userProfile}
        />
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
    const { data: foodList } = await supabase
      .from("food")
      .select("*")
      .eq("user_id", userId);
    const { data: userProfile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .limit(1)
      .single();
    return {
      props: { user: user, foodList: foodList, userProfile: userProfile },
    };
  },
});
